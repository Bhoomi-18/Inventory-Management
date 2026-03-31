import { useEffect, useMemo, useState } from "react";
import api from "../../lib/apiClient";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Input } from "../../components/ui/input"; 
import LowStockList from "./lowStockList";
import TopProductsTable from "./topProductsTable";
import CustomerLeaderboard from "./customerList";

type Sale = {
  _id: string;
  productId: {
    name: string;
    price: number;
  };
  quantity: number;
  totalPrice: number;
  customerName: string;
  timestamp: string;
};

const ReportsDashboard = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/sales').then((res) => setSales(res.data)),
      api.get('/products').then((res) => setProducts(res.data))
    ]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    // Validate dates
    if (from && to && from > to) {
      setDateError("'From' date cannot be after 'To' date");
      setFilteredSales([]);
      return;
    } else {
      setDateError("");
    }

    const filtered = sales.filter((sale) => {
      const saleDate = new Date(sale.timestamp);
      if (from && saleDate < from) return false;
      if (to && saleDate > to) return false;
      return true;
    });

    setFilteredSales(filtered);
  }, [sales, fromDate, toDate]);

  const totalRevenue = useMemo(() => {
    return filteredSales.reduce((sum, s) => sum + s.totalPrice, 0);
  }, [filteredSales]);

  const avgOrderValue = useMemo(() => {
    return filteredSales.length > 0 ? (totalRevenue / filteredSales.length).toFixed(2) : 0;
  }, [filteredSales, totalRevenue]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <Separator />

      {dateError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{dateError}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center text-muted-foreground py-8">Loading reports data...</div>
      ) : (
        <>
          <Card className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
            <CardContent>
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="text-lg font-semibold">{filteredSales.length}</p>
            </CardContent>
            <CardContent>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-lg font-semibold">₹{totalRevenue.toFixed(2)}</p>
            </CardContent>
            <CardContent>
              <p className="text-sm text-muted-foreground">Avg Order</p>
              <p className="text-lg font-semibold">₹{avgOrderValue}</p>
            </CardContent>
            <CardContent>
              <p className="text-sm text-muted-foreground">From</p>
              <Input 
                type="date" 
                value={fromDate} 
                onChange={(e) => setFromDate(e.target.value)}
                onFocus={(e) => (e.target as HTMLInputElement).showPicker?.()}
                className={dateError ? "border-red-300 dark:border-red-400" : ""}
              />
            </CardContent>
            <CardContent>
              <p className="text-sm text-muted-foreground">To</p>
              <Input 
                type="date" 
                value={toDate} 
                onChange={(e) => setToDate(e.target.value)}
                onFocus={(e) => (e.target as HTMLInputElement).showPicker?.()}
                className={dateError ? "border-red-300 dark:border-red-400" : ""}
              />
            </CardContent>
          </Card>

      <LowStockList products={products} />
      <TopProductsTable sales={filteredSales} />
      <CustomerLeaderboard sales={filteredSales} />
        </>
      )}
    </div>
  );
};

export default ReportsDashboard;