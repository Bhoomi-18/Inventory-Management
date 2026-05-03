import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import api from "../../lib/apiClient";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import type { Sale } from "./addSale";

type DeleteSaleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sale: Sale;
  onSuccess: () => void;
};

export function DeleteSaleDialog({
  open,
  onOpenChange,
  sale,
  onSuccess,
}: DeleteSaleDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");
      await api.delete(`/sales/${sale._id}`);
      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to delete sale";
      setError(errorMsg);
      console.error("Sale deletion failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Sale</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="alert-error flex items-start gap-3 p-3 border rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Delete sale for <strong>{sale.productId.name}</strong>?
              </p>
              <p className="text-sm">
                Quantity: {sale.quantity}, Total: ₹{sale.totalPrice}
              </p>
              <p className="text-sm">
                This action cannot be undone. Stock will be restored.
              </p>
            </div>
          </div>

          {error && (
            <div className="alert-error p-3 border rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
