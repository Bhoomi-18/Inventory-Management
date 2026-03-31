import { Shield } from "lucide-react";

const SecuritySection = () => {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-5 h-5 text-red-500" />
        <h2 className="text-lg font-semibold">Security</h2>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"> 
          <span>Two-factor authentication</span>
          <button className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs">Enable</button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Add an additional verification step for sensitive actions.</p>
      </div>
    </div>
  );
};

export default SecuritySection;
