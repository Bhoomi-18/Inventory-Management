import { useState, useEffect } from "react";
import api from "../../lib/apiClient";
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
import { ChevronDown } from "lucide-react";
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
    _id: string;
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
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quantityError, setQuantityError] = useState("");
  const [open, setOpen] = useState(false);

  const availableProducts = products.filter((p) => p.stock > 0);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/products').then((res) => setProducts(res.data)),
      api.get('/sales').then((res) => setSales(res.data))
    ]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const selected = products.find((p) => p._id === productId);
    setSelectedProduct(selected || null);
    if (selected) {
      setPrice(selected.price);
      setStatus(""); // Clear success message when product changes
    }
  }, [productId, products]);

  const handleSale = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const selected = products.find((p) => p._id === productId);
      if (!selected) {
        setStatus("Please select a product");
        return;
      }
      if (selected.stock < quantity) {
        setQuantityError(`Only ${selected.stock} items available in stock`);
        return;
      }

      setSubmitting(true);
      await api.post('/sales', {
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
      setQuantityError("");
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, stock: p.stock - quantity } : p
        )
      );

      const updatedSales = await api.get('/sales');
      setSales(updatedSales.data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to record sale";
      setStatus(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    if (selectedProduct && value > selectedProduct.stock) {
      setQuantityError(`Only ${selectedProduct.stock} items available in stock`);
    } else {
      setQuantityError("");
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
          {loading ? (
            <div className="py-8 text-center text-muted-foreground">
              Loading products...
            </div>
          ) : (
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

              <div>
                <Input
                  type="number"
                  min={1}
                  max={selectedProduct?.stock || 1}
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  disabled={!selectedProduct}
                />
                {quantityError && (
                  <p className="text-sm text-red-500 mt-1">{quantityError}</p>
                )}
              </div>

              <Input
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />

              <div className="text-sm text-muted-foreground">Price: ₹{price}</div>
              <div className="text-sm font-medium">Total: ₹{total}</div>

              <Button 
                type="submit" 
                disabled={!productId || quantity <= 0 || quantityError !== "" || submitting}
              >
                {submitting ? "Submitting..." : "Submit Sale"}
              </Button>

              {status && (
                <p className={`text-sm ${status.includes("recorded") ? "text-green-600" : "text-red-600"}`}>
                  {status}
                </p>
              )}
            </form>
          )}
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold">Sales History</h2>
      <SalesTable sales={sales} />
    </div>
  );
};

export default AddSale;