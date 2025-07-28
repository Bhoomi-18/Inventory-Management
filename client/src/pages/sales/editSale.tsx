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
import type { Sale} from "./addSale"; 
import axios from "axios";

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

  useEffect(() => {
    setPrice(sale.productId.price);
  }, [sale]);

  const total = quantity * price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://inventory-management-ogu0.onrender.com/api/sales/${sale._id}`, {
        quantity,
        customerName,
      });

      onSuccess(response.data);
      setStatus("Sale updated successfully ✅");
    } catch (err) {
      setStatus("Failed to update sale");
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

          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            required
          />

          <Input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
            required
          />

          <div className="text-sm text-muted-foreground">Price: ₹{price}</div>
          <div className="text-sm font-medium">Total: ₹{total}</div>

          <div className="flex justify-end gap-2">
            <Button type="submit">Save</Button>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
          </div>

          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSaleDialog;