import { useEffect, useMemo, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    axios.get("https://inventory-management-ogu0.onrender.com/api/sales").then((res) => setSales(res.data));
    axios.get("https://inventory-management-ogu0.onrender.com/api/products").then((res) => setProducts(res.data));
  }, []);

  useEffect(() => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <Separator />

      <Card className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <CardContent>
          <p className="text-sm text-muted-foreground">Total Sales</p>
          <p className="text-lg font-semibold">{filteredSales.length}</p>
        </CardContent>
        <CardContent>
          <p className="text-sm text-muted-foreground">Revenue</p>
          <p className="text-lg font-semibold">₹{totalRevenue}</p>
        </CardContent>
        <CardContent>
          <p className="text-sm text-muted-foreground">From</p>
          <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </CardContent>
        <CardContent>
          <p className="text-sm text-muted-foreground">To</p>
          <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </CardContent>
      </Card>

      <LowStockList products={products} />
      <TopProductsTable sales={filteredSales} />
      <CustomerLeaderboard sales={filteredSales} />
    </div>
  );
};

export default ReportsDashboard;