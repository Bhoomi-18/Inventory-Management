import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import type { Sale } from "./addSale";
import api from "../../lib/apiClient";

type Props = {
  sale: Sale;
  onSuccess: (updated: Sale) => void;
  onClose: () => void;
};

const EditSaleDialog = ({ sale, onSuccess, onClose }: Props) => {
  const [quantity, setQuantity] = useState(sale.quantity);
  const [customerName, setCustomerName] = useState(sale.customerName);
  const [price, setPrice] = useState(sale.productId.price);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [quantityError, setQuantityError] = useState("");
  const [currentStock, setCurrentStock] = useState(0);

  useEffect(() => {
    setPrice(sale.productId.price);
    // Fetch current product stock to show how much we have
    api.get(`/products`).then((res) => {
      const product = res.data.find((p: any) => p._id === sale.productId._id || p.name === sale.productId.name);
      if (product) {
        setCurrentStock(product.stock);
      }
    });
  }, [sale]);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    // Calculate available quantity: current stock + previous quantity (what we're replacing)
    const availableForChange = currentStock + sale.quantity;
    if (value > availableForChange) {
      setQuantityError(`Maximum ${availableForChange} items available (current stock: ${currentStock})`);
    } else {
      setQuantityError("");
    }
  };

  const total = quantity * price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quantityError) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.put(`/sales/${sale._id}`, {
        quantity,
        customerName,
      });

      onSuccess(response.data);
      setStatus("Sale updated successfully ✅");
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to update sale";
      setStatus(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Sale</DialogTitle>
        </DialogHeader>
        <Separator />
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <Input
            disabled
            value={`${sale.productId.name} — ₹${sale.productId.price}`}
          />

          <div>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              placeholder="Quantity"
            />
            {quantityError && (
              <div className="flex items-start gap-2 mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">{quantityError}</p>
              </div>
            )}
          </div>

          <Input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
          />

          <div className="text-sm text-muted-foreground">Price: ₹{price}</div>
          <div className="text-sm font-medium">Total: ₹{total}</div>

          {status && (
            <div className={`text-sm ${status.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
              {status}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={submitting || quantityError !== ""}
            >
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSaleDialog;