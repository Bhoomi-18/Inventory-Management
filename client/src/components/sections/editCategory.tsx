import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import api from "../../lib/apiClient";
import { useState } from "react";
import { Label } from "../ui/label";
import { IconPicker } from "../ui/iconPicker";

const schema = z.object({
  color: z.string().min(1, "Color is required"),
  icon: z.string().min(1, "Icon is required"),
});

type CategoryFormData = z.infer<typeof schema>;

type EditCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: {
    name: string;
    color?: string;
    icon?: string;
  };
  onSuccess: () => void;
};

export function EditCategoryDialog({
  open,
  onOpenChange,
  category,
  onSuccess,
}: EditCategoryDialogProps) {
  const { handleSubmit, watch, setValue } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: category.color || "#3B82F6",
      icon: category.icon || "Tags",
    },
  });

  const [loading, setLoading] = useState(false);
  const color = watch("color");
  const icon = watch("icon");

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setLoading(true);
      await api.put(`/categories/${category.name}`, data);
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      console.error("Category update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category: {category.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setValue("color", e.target.value)}
                className="w-12 h-10 rounded cursor-pointer border"
              />
              <span className="text-sm text-muted-foreground">{color}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <IconPicker value={icon} onChange={(iconName) => setValue("icon", iconName)} />
          </div>

          <DialogFooter className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
