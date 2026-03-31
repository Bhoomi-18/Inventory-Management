import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./popover";
import { Check, ChevronsUpDown } from "lucide-react";

type Category = {
  name: string;
  color?: string;
  icon?: string;
};

type CategorySelectorProps = {
  value: string;
  onChange: (category: string) => void;
  categories: Category[];
};

export function CategorySelector({
  value,
  onChange,
  categories,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCategory = categories.find((cat) => cat.name === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">
            {selectedCategory ? selectedCategory.name : "Select category..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="space-y-2">
          <div className="px-2 pt-2">
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="max-h-48 overflow-y-auto px-2 pb-2">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    onChange(category.name);
                    setOpen(false);
                    setSearchQuery("");
                  }}
                  className="flex w-full items-center gap-3 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {category.color && (
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                  )}
                  <span className="flex-1 text-left">{category.name}</span>
                  {value === category.name && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                No categories found.
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
