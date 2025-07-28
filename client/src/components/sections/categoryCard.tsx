import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tags } from "lucide-react";
import { Link } from "react-router-dom";

type CategoryCardProps = {
  name: string;
  count: number;
  icon?: React.ReactNode;
};

const CategoryCard = ({ name, count, icon = <Tags className="w-5 h-5 text-primary" /> }: CategoryCardProps) => {
  return (
    <Link to={`/inventory/categories/${name.toLowerCase()}`}>
      <Card className="hover:shadow-md transition">
        <CardHeader className="flex items-center gap-3">
          {icon}
          <CardTitle className="text-base">{name}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {count} product{count !== 1 && "s"}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;