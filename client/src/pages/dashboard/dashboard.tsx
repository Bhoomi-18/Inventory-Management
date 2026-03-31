import { useEffect, useState } from "react";
import api from "../../lib/apiClient";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Tags, AlertCircle, TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStock: 0,
    totalSales: 0,
    totalRevenue: 0,
    recentSales: 0,
  });

  const [recentProducts, setRecentProducts] = useState<{ name: string; category: string; stock: number; price: number }[]>([]);
  const [recentSales, setRecentSales] = useState<{ productId: { name: string }; quantity: number; totalPrice: number; timestamp: string }[]>([]);
  const [categorySummary, setCategorySummary] = useState<{ name: string; count: number; color?: string }[]>([]);
  const [recentActivity, setRecentActivity] = useState<{ action: string; details: string; timestamp: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, lowStockRes, salesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
          api.get('/products/low-stock'),
          api.get('/sales'),
        ]);

        const products = productsRes.data;
        const sales = salesRes.data;

        setMetrics({
          totalProducts: products.length,
          totalCategories: categoriesRes.data.length,
          lowStock: lowStockRes.data.length,
          totalSales: sales.length,
          totalRevenue: sales.reduce((sum: number, sale: any) => sum + sale.totalPrice, 0),
          recentSales: sales.filter((sale: any) => {
            const saleDate = new Date(sale.timestamp);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return saleDate >= weekAgo;
          }).length,
        });

        setRecentProducts(products.slice(-5).reverse());
        setRecentSales(sales.slice(-5).reverse());

        // Calculate category counts
        const categoryCounts: { [key: string]: { count: number; color?: string } } = {};
        products.forEach((product: any) => {
          const category = product.category;
          if (!categoryCounts[category]) {
            categoryCounts[category] = { count: 0 };
          }
          categoryCounts[category].count++;
        });

        setCategorySummary(
          categoriesRes.data.map((cat: any) => ({
            name: cat.name,
            count: categoryCounts[cat.name]?.count || 0,
            color: cat.color,
          }))
        );

        // Generate recent activity
        const activities: { action: string; details: string; timestamp: string }[] = [];

        // Add recent product activities
        products.slice(-3).reverse().forEach((product: any) => {
          activities.push({
            action: "Product Added",
            details: `${product.name} (${product.category})`,
            timestamp: "Recently",
          });
        });

        // Add recent sales activities
        sales.slice(-3).reverse().forEach((sale: any) => {
          activities.push({
            action: "Sale Made",
            details: `${sale.productId.name} (${sale.quantity} units)`,
            timestamp: new Date(sale.timestamp).toLocaleDateString(),
          });
        });

        setRecentActivity(activities.slice(-5)); // Keep only the 5 most recent activities
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
      icon: <Package className="w-5 h-5 text-primary" />,
      link: "/inventory/products",
    },
    {
      label: "Total Sales",
      value: metrics.totalSales,
      icon: <ShoppingCart className="w-5 h-5 text-blue-500" />,
      link: "/inventory/sales",
    },
    {
      label: "Revenue",
      value: `₹${metrics.totalRevenue.toFixed(2)}`,
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
      link: "/inventory/reports",
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
      icon: <Tags className="w-5 h-5 text-purple-500" />,
      link: "/inventory/categories",
    },
    {
      label: "Recent Sales",
      value: metrics.recentSales,
      icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
      link: "/inventory/sales",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Products</h2>
          {recentProducts.length === 0 ? (
            <Card>
              <CardContent className="p-4 text-muted-foreground text-sm">
                No recent product entries yet. Start by adding your inventory!
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentProducts.map((product, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category: {product.category}</span>
                      <span className="text-muted-foreground">Stock: {product.stock}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Price: ₹{product.price}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Sales</h2>
          {recentSales.length === 0 ? (
            <Card>
              <CardContent className="p-4 text-muted-foreground text-sm">
                No recent sales yet. Start selling your products!
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentSales.map((sale, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{sale.productId.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quantity: {sale.quantity}</span>
                      <span className="text-green-600 font-medium">₹{sale.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {new Date(sale.timestamp).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Category Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categorySummary.map((cat) => (
            <Card key={cat.name}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color || '#6b7280' }}
                  />
                  {cat.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{cat.count}</div>
                <div className="text-sm text-muted-foreground">products</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                  No recent activity yet.
                </div>
              ) : (
                recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="font-medium">{activity.action}</span>
                      <span className="text-muted-foreground ml-1">{activity.details}</span>
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {activity.timestamp}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;