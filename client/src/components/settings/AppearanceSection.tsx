import { SlidersHorizontal, Moon, Sun, Monitor } from "lucide-react";

type Theme = 'light' | 'dark' | 'system';

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setStatus: (s: string) => void;
}

const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
  { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
];

const AppearanceSection = ({ theme, setTheme, setStatus }: Props) => {
  return (
    <div className="p-4 border border-border rounded-lg bg-card text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-foreground" />
        <h2 className="text-lg font-semibold">Appearance</h2>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Theme</label>
        <div className="flex gap-2 flex-wrap">
          {themeOptions.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setStatus(`Theme set to ${value}`);
              }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-all
                ${theme === value
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background text-foreground border-border hover:bg-muted'
                }
              `}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {theme === 'system' ? 'Follows your system preference.' : `Currently using ${theme} theme.`}
        </p>
      </div>
    </div>
  );
};

export default AppearanceSection;
