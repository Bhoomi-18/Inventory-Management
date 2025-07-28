import { CheckCircle, AlertTriangle } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  stock: number;
};

type Props = {
  products: Product[];
};

const LowStockList = ({ products }: Props) => {
  const lowStock = products.filter((p) => p.stock <= 10);

  return (
    <div className="p-6 bg-white rounded-md shadow-md space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        Low Stock Products
      </h2>

      {lowStock.length === 0 ? (
        <p className="text-base text-green-600 flex items-center gap-2 font-medium">
          <CheckCircle className="w-5 h-5" />
          <span>All products sufficiently stocked</span>
        </p>
      ) : (
        <ul className="space-y-3">
          {lowStock.map((p) => (
            <li
              key={p._id}
              className="flex justify-between items-center px-4 py-2 bg-red-50 rounded-md border border-red-200"
            >
              <span className="text-base font-semibold text-gray-800">{p.name}</span>
              <span className="text-red-700 font-semibold text-sm">{p.stock} left</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



export default LowStockList;