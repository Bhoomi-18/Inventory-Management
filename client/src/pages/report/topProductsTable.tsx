import { PackageSearch, Boxes, IndianRupee } from "lucide-react";

type Sale = {
  productId: {
    name: string;
    price: number;
  };
  quantity: number;
  totalPrice: number;
};

type Props = {
  sales: Sale[];
};

type ProductStats = {
  quantity: number;
  revenue: number;
};

const TopProductsTable = ({ sales }: Props) => {
  const productStats: Record<string, ProductStats> = {};

  sales.forEach((sale) => {
    const name = sale.productId.name;
    if (!productStats[name]) {
      productStats[name] = { quantity: 0, revenue: 0 };
    }
    productStats[name].quantity += sale.quantity;
    productStats[name].revenue += sale.totalPrice;
  });

  const rows = Object.entries(productStats)
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div className="p-4 lg:p-6 rounded-md shadow-md space-y-6 border border-border bg-card text-card-foreground dark:shadow-lg">
      <h2 className="text-xl lg:text-2xl font-bold text-foreground flex items-center gap-3">
        <PackageSearch className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" />
        Top-Selling Products
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-md overflow-hidden bg-card text-foreground min-w-[400px]">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-3 lg:px-4 py-2 text-left font-medium">
                <div className="flex items-center gap-1">
                  <Boxes className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500" />
                  <span>Product</span>
                </div>
              </th>
              <th className="px-3 lg:px-4 py-2 text-center font-medium">
                <div className="flex items-center justify-center gap-1">
                  <PackageSearch className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500" />
                  <span>Quantity</span>
                </div>
              </th>
              <th className="px-3 lg:px-4 py-2 text-right font-medium">
                <div className="flex items-center justify-end gap-1">
                  <IndianRupee className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500" />
                  <span>Revenue</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, stats], index) => (
              <tr
                key={name}
                className={index % 2 === 0 ? "bg-card" : "bg-muted"}
              >
                <td className="px-3 lg:px-4 py-2 font-semibold text-foreground">{name}</td>
                <td className="px-3 lg:px-4 py-2 text-center">{stats.quantity}</td>
                <td className="px-3 lg:px-4 py-2 text-right text-green-600 dark:text-green-400 font-medium">
                  ₹{stats.revenue.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProductsTable;