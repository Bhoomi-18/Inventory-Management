import { useTheme } from "../../components/theme/ThemeProvider";
import AppearanceSection from "../../components/settings/AppearanceSection";
import NotificationSection from "../../components/settings/NotificationSection";
import SecuritySection from "../../components/settings/SecuritySection";
import { Separator } from "../../components/ui/separator";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <Separator />

      <AppearanceSection theme={theme} setTheme={setTheme} setStatus={() => {}} />
      <NotificationSection />
      <SecuritySection />
    </div>
  );
};

export default Settings;
