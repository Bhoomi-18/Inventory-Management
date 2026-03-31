import { Button } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover";
import {
  Tags,
  Package,
  Zap,
  Home,
  Heart,
  Star,
  Layers,
  Box,
  ShoppingCart,
  Briefcase,
  Palette,
  Coffee,
  Smile,
  Lightbulb,
  Truck,
} from "lucide-react";

const AVAILABLE_ICONS = [
  { name: "Tags", icon: Tags },
  { name: "Package", icon: Package },
  { name: "Zap", icon: Zap },
  { name: "Home", icon: Home },
  { name: "Heart", icon: Heart },
  { name: "Star", icon: Star },
  { name: "Layers", icon: Layers },
  { name: "Box", icon: Box },
  { name: "ShoppingCart", icon: ShoppingCart },
  { name: "Briefcase", icon: Briefcase },
  { name: "Palette", icon: Palette },
  { name: "Coffee", icon: Coffee },
  { name: "Smile", icon: Smile },
  { name: "Lightbulb", icon: Lightbulb },
  { name: "Truck", icon: Truck },
];

type IconPickerProps = {
  value: string;
  onChange: (iconName: string) => void;
};

export function IconPicker({ value, onChange }: IconPickerProps) {
  const selectedIcon = AVAILABLE_ICONS.find((i) => i.name === value);
  const SelectedIconComponent = selectedIcon?.icon || Tags;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2">
          <SelectedIconComponent className="w-4 h-4" />
          <span>{value}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="grid grid-cols-4 gap-2">
          {AVAILABLE_ICONS.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => onChange(name)}
              className={`p-2 rounded-lg transition ${
                value === name
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
              title={name}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
