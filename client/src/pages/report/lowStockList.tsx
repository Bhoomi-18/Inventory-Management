import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  stock: number;
};

type Props = {
  products: Product[];
};

const LowStockList = ({ products }: Props) => {
  const outOfStock = products.filter((p) => p.stock === 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10);
  const percentOutOfStock = products.length > 0 ? ((outOfStock.length / products.length) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 rounded-md shadow-md space-y-6 border border-border bg-card text-card-foreground dark:shadow-lg">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          Stock Status
        </h2>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{outOfStock.length} ({percentOutOfStock}%)</p>
        </div>
      </div>

      {outOfStock.length === 0 && lowStock.length === 0 ? (
        <p className="text-base text-green-600 flex items-center gap-2 font-medium">
          <CheckCircle className="w-5 h-5" />
          <span>All products sufficiently stocked</span>
        </p>
      ) : (
        <>
          {outOfStock.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Out of Stock ({outOfStock.length})
              </h3>
              <ul className="space-y-2">
                {outOfStock.map((p) => (
                  <li
                    key={p._id}
                    className="flex justify-between items-center px-4 py-2 bg-red-100 dark:bg-red-950/50 rounded-md border border-red-400"
                  >
                    <span className="text-base font-semibold text-foreground dark:text-card-foreground">{p.name}</span>
                    <span className="text-red-900 dark:text-red-100 font-bold text-sm bg-red-200 dark:bg-red-900/30 px-3 py-1 rounded">Out of Stock</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lowStock.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-orange-700 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Low Stock ({lowStock.length})
              </h3>
              <ul className="space-y-2">
                {lowStock.map((p) => (
                  <li
                    key={p._id}
                    className="flex justify-between items-center px-4 py-2 bg-orange-50 dark:bg-orange-950/40 rounded-md border border-orange-200"
                  >
                    <span className="text-base font-semibold text-foreground dark:text-card-foreground">{p.name}</span>
                    <span className="text-orange-700 dark:text-orange-200 font-semibold text-sm bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded">{p.stock} left</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LowStockList;