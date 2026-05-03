import { Link, useLocation } from "react-router-dom";
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
  Mail,
} from "lucide-react";
import { useAuth } from "../../schemas/authContext";
import LogoutButton from "./logout";
import { cn } from "../../lib/utils";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: "Home",       to: "/inventory",            icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Products",   to: "/inventory/products",   icon: <Package className="w-4 h-4" /> },
    { label: "Categories", to: "/inventory/categories", icon: <Tag className="w-4 h-4" /> },
    { label: "Sales",      to: "/inventory/sales",      icon: <DollarSign className="w-4 h-4" /> },
    { label: "Reports",    to: "/inventory/reports",    icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings",   to: "/inventory/settings",   icon: <Settings className="w-4 h-4" /> },
  ];

  const isActive = (to: string) => {
    if (to === "/inventory") return location.pathname === "/inventory";
    return location.pathname.startsWith(to);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        {/* Brand – hidden on mobile (shown in Layout header) */}
        <div className="hidden lg:flex items-center gap-2 px-1 py-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)" }}>
            <Package className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight brand-gradient">WareSync</span>
        </div>

        <Separator />

        {/* User card */}
        <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg border"
          style={{
            backgroundColor: "var(--muted)",
            borderColor: "var(--border)",
          }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #2563eb, #60a5fa)" }}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate"
              style={{ color: "var(--sidebar-foreground)" }}>
              {user?.name || "Guest"}
            </p>
            <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>
              {user?.email || "N/A"}
            </p>
          </div>
        </div>

        <Separator />

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-0.5">
            {navItems.map(({ label, to, icon }) => {
              const active = isActive(to);
              return (
                <Link
                  key={label}
                  to={to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    active
                      ? "text-white shadow-sm"
                      : "hover:opacity-90"
                  )}
                  style={
                    active
                      ? { background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff" }
                      : { color: "var(--sidebar-foreground)" }
                  }
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--muted)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "";
                    }
                  }}
                >
                  <span className={active ? "opacity-100" : "opacity-70"}>
                    {icon}
                  </span>
                  {label}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </div>

      {/* Logout */}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;