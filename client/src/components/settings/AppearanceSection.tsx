import { SlidersHorizontal } from "lucide-react";

type Theme = 'light' | 'dark' | 'system';

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setStatus: (s: string) => void;
}

const AppearanceSection = ({ theme, setTheme, setStatus }: Props) => {
  const onChangeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Theme;
    setTheme(value);
    setStatus(`Theme set to ${value}`);
  };

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Appearance</h2>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Theme</label>
        <select
          value={theme}
          onChange={onChangeTheme}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  );
};

export default AppearanceSection;
