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
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Top-Selling Products</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Product</th>
            <th>Quantity</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, stats]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{stats.quantity}</td>
              <td>₹{stats.revenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;