import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { productSchema, type ProductFormValues } from "../../schemas/productSchema";
import { CategorySelector } from "../../components/ui/categorySelector";

type Category = {
  name: string;
  color?: string;
  icon?: string;
};

type Props = {
  initialValues?: ProductFormValues;
  categories: Category[];
  onSubmit: (data: ProductFormValues) => Promise<void>;
  onClose?: () => void;
};

const ProductFormBody = ({ initialValues, categories, onSubmit, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: initialValues || {
      name: "",
      category: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <div>
        <Input placeholder="Product Name" {...register("name")} />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Input type="number" placeholder="Price" step="0.01" {...register("price", { valueAsNumber: true })} />
        {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <Input type="number" placeholder="Stock" {...register("stock", { valueAsNumber: true })} />
        {errors.stock && <p className="text-sm text-red-500 mt-1">{errors.stock.message}</p>}
      </div>

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <CategorySelector
            value={field.value}
            onChange={field.onChange}
            categories={categories}
          />
        )}
      />
      {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default ProductFormBody;