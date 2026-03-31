import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import api from "../../lib/apiClient";
import { useState } from "react";
import { Label } from "../ui/label";
import { IconPicker } from "../ui/iconPicker";

const schema = z.object({
  name: z.string().min(1, "Category name is required"),
  color: z.string().min(1, "Color is required"),
  icon: z.string().min(1, "Icon is required"),
});

type CategoryFormData = z.infer<typeof schema>;

const AddCategoryDialog = ({ onSuccess, children }: { onSuccess: () => void; children?: React.ReactNode }) => {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      color: "#3B82F6",
      icon: "Tags",
    },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const color = watch("color");
  const icon = watch("icon");

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setLoading(true);
      await api.post("/categories", data);
      reset();
      setOpen(false);
      onSuccess();
    } catch (err) {
      console.error("Category creation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          <Button className="flex items-center gap-2">
            {children}
          </Button>
        ) : (
          <Button className="flex items-center gap-2">Add Category</Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="Enter category name"
              {...register("name")}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;