import { PlusCircle, FolderOpen } from "lucide-react";
import CategoryCard from "../../components/sections/categoryCard";
import { Separator } from "../../components/ui/separator";
import api from "../../lib/apiClient";
import { useState, useEffect } from "react";
import AddCategoryDialog from "../../components/sections/addCategory";
import { EditCategoryDialog } from "../../components/sections/editCategory";
import { DeleteCategoryDialog } from "../../components/sections/deleteCategory";
import { Card, CardContent } from "../../components/ui/card";

type Category = {
  _id?: string;
  name: string;
  count: number;
  color?: string;
  icon?: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchCategories = () => {
    api
      .get('/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Category fetch error:', err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setEditOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setDeletingCategory(category);
    setDeleteOpen(true);
  };

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

      {categories.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              No Categories Yet
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm text-center">
              Start by creating your first category. Categories help you organize and manage your products efficiently.
            </p>
            <AddCategoryDialog onSuccess={fetchCategories}>
              <PlusCircle className="w-4 h-4" />
              <span>Create Category</span>
            </AddCategoryDialog>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              count={cat.count}
              color={cat.color}
              icon={cat.icon}
              onEdit={() => handleEditClick(cat)}
              onDelete={() => handleDeleteClick(cat)}
            />
          ))}
        </div>
      )}

      {editingCategory && (
        <EditCategoryDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          category={editingCategory}
          onSuccess={fetchCategories}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          categoryName={deletingCategory.name}
          onSuccess={fetchCategories}
        />
      )}
    </div>
  );
};

export default Categories;