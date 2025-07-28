import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "../../components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";
import { ChevronDown } from "lucide-react"; // or any icon lib
import SalesTable from "./salesTable";

export type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
};

export type Sale = {
  _id: string;
  productId: {
    name: string;
    price: number;
  };
  quantity: number;
  customerName: string;
  totalPrice: number;
  timestamp: string;
};

const AddSale = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [productId, setProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const availableProducts = products.filter((p) => p.stock > 0);

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
    axios.get("/api/sales").then((res) => setSales(res.data));
  }, []);

  useEffect(() => {
    const selected = products.find((p) => p._id === productId);
    setSelectedProduct(selected || null);
    if (selected) setPrice(selected.price);
  }, [productId, products]);

  const handleSale = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selected = products.find((p) => p._id === productId);
      if (!selected || selected.stock < quantity) {
        return setStatus("Invalid product or insufficient stock");
      }

      await axios.post("/api/sales", {
        productId,
        quantity,
        customerName,
      });

      setStatus("Sale recorded ✅");
      setProductId("");
      setQuantity(1);
      setCustomerName("");
      setPrice(0);
      setSelectedProduct(null);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, stock: p.stock - quantity } : p
        )
      );

      const updatedSales = await axios.get("/api/sales");
      setSales(updatedSales.data);
    } catch (err) {
      setStatus("Failed to record sale");
    }
  };

  const total = quantity * price;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Add Sale</h1>
      <Separator />

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="text-base">Sale Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSale} className="space-y-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedProduct
                    ? `${selectedProduct.name} — ₹${selectedProduct.price}`
                    : "Search products..."}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search products..." />
                  <CommandList>
                    <CommandEmpty>No products found</CommandEmpty>
                    <CommandGroup>
                      {availableProducts.map((p) => (
                        <CommandItem
                          key={p._id}
                          value={p.name}
                          onSelect={() => {
                            setProductId(p._id);
                            setOpen(false);
                          }}
                        >
                          {p.name} — ₹{p.price} ({p.stock} left)
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Input
              type="number"
              min={1}
              max={selectedProduct?.stock || 1}
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => {
                const stock = selectedProduct?.stock || 1;
                const value = Math.min(Number(e.target.value), stock);
                setQuantity(value);
              }}
            />

            <Input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />

            <div className="text-sm text-muted-foreground">Price: ₹{price}</div>
            <div className="text-sm font-medium">Total: ₹{total}</div>

            <Button type="submit" disabled={!productId || quantity <= 0}>
              Submit Sale
            </Button>

            {status && (
              <p className="text-sm text-muted-foreground">{status}</p>
            )}
          </form>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold">Sales History</h2>
      <SalesTable sales={sales} />
    </div>
  );
};

export default AddSale;