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
    <aside className="fixed top-0 left-0 h-screen w-64 bg-card text-card-foreground border-r border-border flex flex-col justify-between p-4">
      <div>
        <h2 className="text-lg font-semibold mb-2 tracking-tight text-foreground">WareSync</h2>
        <Separator className="mb-4" />
        <div className="mb-4 px-3 py-2 bg-muted rounded-md border border-border">
          <div className="flex items-center gap-2 mb-1">
            <User2 className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{user?.name || 'Guest'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4" />
            <span>{user?.email || 'N/A'}</span>
          </div>
        </div>
        <Separator className="mb-4" />
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ label, to, icon }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted hover:text-foreground text-sm font-medium text-foreground"
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
      <div>
        <Separator className="my-4" />
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;