import { Bell } from "lucide-react";
import { useState } from "react";

const NotificationSection = () => {
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [salesSummary, setSalesSummary] = useState(false);

  return (
    <div className="p-4 border border-border rounded-lg bg-card text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-5 h-5 text-foreground" />
        <h2 className="text-lg font-semibold">Notifications</h2>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Low stock alerts</span>
          <input
            type="checkbox"
            checked={lowStockAlerts}
            onChange={(e) => setLowStockAlerts(e.target.checked)}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Sales summary</span>
          <input
            type="checkbox"
            checked={salesSummary}
            onChange={(e) => setSalesSummary(e.target.checked)}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
