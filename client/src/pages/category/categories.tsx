import { PlusCircle } from "lucide-react";
import CategoryCard from "../../components/sections/categoryCard";
import { Separator } from "../../components/ui/separator";
import axios from "axios";
import { useState, useEffect } from "react";
import AddCategoryDialog from "../../components/sections/addCategory";

type Category = {
  name: string;
  count: number;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = () => {
    axios.get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch error:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <AddCategoryDialog onSuccess={fetchCategories}>
          <PlusCircle className="w-4 h-4" />
          <span>Add Category</span>
        </AddCategoryDialog>
      </div>
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.name} name={cat.name} count={cat.count} />
        ))}
      </div>
    </div>
  );
};

export default Categories;