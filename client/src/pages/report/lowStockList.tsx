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
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Low Stock Products</h2>
      {lowStock.length === 0 ? (
        <p className="text-sm text-muted-foreground">All products sufficiently stocked ✅</p>
      ) : (
        <ul className="text-sm list-disc list-inside">
          {lowStock.map((p) => (
            <li key={p._id}>
              {p.name} — {p.stock} left
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LowStockList;