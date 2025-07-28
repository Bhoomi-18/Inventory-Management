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

const CustomerLeaderboard = ({ sales }: Props) => {
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
    .sort(([, aData], [, bData]) => bData.spent - aData.spent)
    .slice(0, 5);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Customer Leaderboard</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Customer</th>
            <th>Orders</th>
            <th>Spent</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map(([name, data]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{data.purchases}</td>
              <td>₹{data.spent.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerLeaderboard;