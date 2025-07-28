import { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "../../components/sections/productTable";
import { Separator } from "../../components/ui/separator";

type Product = {
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  _id: string;
};

const LowStockProducts = () => {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://inventory-management-ogu0.onrender.com/api/products/low-stock?limit=10")
      .then((res) => setLowStockProducts(res.data))
      .catch((err) => console.error("Failed to fetch low stock products", err));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Low Stock Products</h1>
      <Separator />

      <ProductTable products={lowStockProducts} />
    </div>
  );
};

export default LowStockProducts;