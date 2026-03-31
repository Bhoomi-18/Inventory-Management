import { useState } from "react";
import { useTheme } from "../../components/theme/ThemeProvider";
import AppearanceSection from "../../components/settings/AppearanceSection";
import NotificationSection from "../../components/settings/NotificationSection";
import SecuritySection from "../../components/settings/SecuritySection";
import { Separator } from "../../components/ui/separator";

const Settings = () => {
  const { theme, setTheme, actualTheme } = useTheme();
  const [status, setStatus] = useState<string>("Ready");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">Current theme: {actualTheme} (selected: {theme})</p>
      <Separator />

      <AppearanceSection theme={theme} setTheme={setTheme} setStatus={setStatus} />
      <NotificationSection />
      <SecuritySection />

      <p className="text-xs text-gray-500">Status: {status}</p>
    </div>
  );
};

export default Settings;
