import { Bell } from "lucide-react";

const NotificationSection = () => {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-5 h-5 text-green-500" />
        <h2 className="text-lg font-semibold">Notifications</h2>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Low stock alerts</span>
          <input type="checkbox" checked={true} readOnly />
        </div>
        <div className="flex items-center justify-between">
          <span>Sales summary</span>
          <input type="checkbox" checked={false} readOnly />
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
