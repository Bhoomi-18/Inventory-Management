import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { productSchema, type ProductFormValues } from "../../schemas/productSchema";

type Props = {
  initialValues?: ProductFormValues;
  categories: string[];
  onSubmit: (data: ProductFormValues) => Promise<void>;
  onClose?: () => void;
};

const ProductFormBody = ({ initialValues, categories, onSubmit, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: initialValues || {
      name: "",
      category: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <Input placeholder="Name" {...register("name")} />
      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

      <Input type="number" placeholder="Price" {...register("price", { valueAsNumber: true })} />
      {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}

      <Input type="number" placeholder="Stock" {...register("stock", { valueAsNumber: true })} />
      {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}

      <div className="flex justify-end gap-3">
        <Button type="submit">Save</Button>
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProductFormBody;