import { useParams } from "react-router-dom";
import ProductTable from "../../components/sections/productTable";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { PlusCircle } from "lucide-react";
import AddProductDialog from "../../components/sections/addProduct";
import type { Product } from "../../schemas/productSchema";

const CategoryProducts = () => {
  const { name } = useParams<{ name: string }>();
  const [products, setProducts] = useState<Product[]>([]);
    const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    axios.get(`/api/products/category/${name}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  function handleAddSuccess(newProduct: Product): void {
    setProducts((prev) => [newProduct, ...prev]);
    setShowAddDialog(false);
  }


  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-bold tracking-tight capitalize">
        Products in {name}
      </h1>
      <Button
          className="flex items-center gap-2"
          onClick={() => setShowAddDialog(true)}
        >
          <PlusCircle className="w-4 h-4" />
          Add Product
        </Button>
        <AddProductDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onSuccess={handleAddSuccess}
        />
      <ProductTable products={products} />
    </div>
  );
};

export default CategoryProducts;