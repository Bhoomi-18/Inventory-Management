import { Product } from "./productModel";
import { Category } from "./categoryModel";

export const updateCategoryCount = async (categoryName: string) => {
  const count = await Product.countDocuments({ category: categoryName });
  await Category.findOneAndUpdate({ name: categoryName }, { count });
};