import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

type CategoryCardProps = {
  name: string;
  count: number;
  color?: string;
  icon?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

const CategoryCard = ({
  name,
  count,
  color = "#3B82F6",
  icon = "Tags",
  onEdit,
  onDelete,
}: CategoryCardProps) => {
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Tags;

  return (
    <Card
      className="hover:shadow-md transition overflow-hidden flex flex-col h-full"
    >
      {/* Color strip at top */}
      <div
        className="h-2 w-full"
        style={{ backgroundColor: color }}
      />

      <CardHeader className="flex-1">
        <div className="flex items-start gap-3 mb-2">
          <IconComponent className="w-5 h-5 flex-shrink-0" style={{ color }} />
          <CardTitle className="text-base flex-1">{name}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          {count} product{count !== 1 ? "s" : ""}
        </p>
      </CardHeader>

      <CardContent className="space-y-2">
        <Link to={`/inventory/categories/${name.toLowerCase()}`}>
          <Button variant="outline" className="w-full">
            View Products
          </Button>
        </Link>

        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;