import { UsersRound, ShoppingCart, IndianRupee } from "lucide-react";

type Sale = {
  customerName: string;
  totalPrice: number;
};

type LeaderData = {
  purchases: number;
  spent: number;
};

type Props = {
  sales: Sale[];
};

const CustomerList = ({ sales }: Props) => {
  const leaderboard: Record<string, LeaderData> = {};

  sales.forEach((sale) => {
    const name = sale.customerName?.trim() || "Anonymous";
    if (!leaderboard[name]) {
      leaderboard[name] = { purchases: 0, spent: 0 };
    }
    leaderboard[name].purchases += 1;
    leaderboard[name].spent += sale.totalPrice;
  });

  const ranked = Object.entries(leaderboard)
    .sort(([, a], [, b]) => b.spent - a.spent)
    .slice(0, 5);

  return (
    <div className="p-6 rounded-md shadow-md space-y-6 border border-border bg-card text-card-foreground dark:shadow-lg">
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
        <UsersRound className="w-6 h-6 text-blue-500" />
        Customer List
      </h2>

      <table className="w-full text-sm border border-border rounded-md overflow-hidden bg-card text-foreground">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="px-4 py-2 text-left font-medium">
              <div className="flex items-center gap-1">
                <UsersRound className="w-4 h-4 text-gray-500" />
                <span>Customer</span>
              </div>
            </th>
            <th className="px-4 py-2 text-center font-medium">
              <div className="flex items-center justify-center gap-1">
                <ShoppingCart className="w-4 h-4 text-gray-500" />
                <span>Orders</span>
              </div>
            </th>
            <th className="px-4 py-2 text-right font-medium">
              <div className="flex items-center justify-end gap-1">
                <IndianRupee className="w-4 h-4 text-gray-500" />
                <span>Spent</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {ranked.map(([name, data], index) => (
            <tr
              key={name}
              className={index % 2 === 0 ? "bg-card dark:bg-gray-800" : "bg-muted dark:bg-gray-700"}
            >
              <td className="px-4 py-2 font-semibold text-foreground dark:text-card-foreground">{name}</td>
              <td className="px-4 py-2 text-center">{data.purchases}</td>
              <td className="px-4 py-2 text-right text-emerald-700 dark:text-emerald-300 font-medium">
                ₹{data.spent.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default CustomerList;