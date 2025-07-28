import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Box, Tags, AlertCircle} from "lucide-react";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStock: 0,
  });

  const [recentProducts, setRecentProducts] = useState<{ name: string; category: string }[]>([]);
  const [categorySummary, setCategorySummary] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, lowStockRes, recentRes] = await Promise.all([
          axios.get("https://inventory-management-ogu0.onrender.com/api/products"),
          axios.get("https://inventory-management-ogu0.onrender.com/api/categories"),
          axios.get("https://inventory-management-ogu0.onrender.com/api/products/low-stock"),
          axios.get("https://inventory-management-ogu0.onrender.com/api/products?limit=5"),
        ]);

        setMetrics({
          totalProducts: productsRes.data.length,
          totalCategories: categoriesRes.data.length,
          lowStock: lowStockRes.data.length,
        });

        setRecentProducts(recentRes.data.slice(0, 3));
        setCategorySummary(
          categoriesRes.data.map((cat: { name: string }) => ({
            name: cat.name,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchData();
  }, []);

  const metricCards = [
    {
      label: "Total Products",
      value: metrics.totalProducts,
      icon: <Box className="w-5 h-5 text-primary" />,
      link: "/inventory/products",
    },
    {
      label: "Low Stock",
      value: metrics.lowStock,
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      link: "/inventory/products/low-stock",
    },
    {
      label: "Categories",
      value: metrics.totalCategories,
      icon: <Tags className="w-5 h-5 text-muted-foreground" />,
      link: "/inventory/categories",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {metricCards.map(({ label, value, icon, link }) => (
          <Link to={link} key={label}>
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardHeader className="flex items-center gap-3">
                {icon}
                <CardTitle className="text-base">{label}</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">{value}</CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Products</h2>
        {recentProducts.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-muted-foreground text-sm">
              No recent product entries yet. Start by adding your inventory!
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProducts.map((product, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Category: {product.category}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Category Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categorySummary.map((cat) => (
            <Card key={cat.name}>
              <CardHeader>
                <CardTitle className="text-base">{cat.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;