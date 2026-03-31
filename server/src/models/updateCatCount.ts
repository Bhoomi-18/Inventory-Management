import { getTenantModels } from "./tenantModels";

export const updateCategoryCount = async (tenantId: string, categoryName: string) => {
  const { Product, Category } = await getTenantModels(tenantId);
  const count = await Product.countDocuments({ category: categoryName });
  await Category.findOneAndUpdate({ name: categoryName }, { count });
};