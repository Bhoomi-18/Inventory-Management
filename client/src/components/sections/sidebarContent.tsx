import { Link } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  LayoutDashboard,
  Package,
  Tag,
  DollarSign,
  BarChart3,
  Settings,
  User2,
  Mail
} from "lucide-react";
import { useAuth } from "../../schemas/authContext";
import LogoutButton from "./logout";

const Sidebar = () => {
  const { user } = useAuth();
  const navItems = [
    { label: "Home", to: "/inventory", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Products", to: "/inventory/products", icon: <Package className="w-4 h-4" /> },
    { label: "Categories", to: "/inventory/categories", icon: <Tag className="w-4 h-4" /> },
    { label: "Sales", to: "/inventory/sales", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Reports", to: "/inventory/reports", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings", to: "/inventory/settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        {/* Logo - Hidden on mobile since it's in header */}
        <h2 className="text-lg font-semibold mb-2 tracking-tight text-foreground hidden lg:block">WareSync</h2>
        <Separator className="mb-4 hidden lg:block" />

        {/* User Info */}
        <div className="mb-4 px-3 py-2 bg-muted rounded-md border border-border">
          <div className="flex items-center gap-2 mb-1">
            <User2 className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground text-sm">{user?.name || 'Guest'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span className="truncate">{user?.email || 'N/A'}</span>
          </div>
        </div>
        <Separator className="mb-4" />

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ label, to, icon }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted hover:text-foreground text-sm font-medium text-foreground transition-colors"
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Logout Button */}
      <div>
        <Separator className="my-4" />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;