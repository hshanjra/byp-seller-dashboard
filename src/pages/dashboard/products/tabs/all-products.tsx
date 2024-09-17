import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProducts } from "@/http";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import Loader from "@/components/Loader";
import { FRONTEND_URL } from "@/constants";
function AllProducts() {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts({}),
    refetchOnWindowFocus: false,
  });

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-screen">
        <div className="flex flex-col  max-w-md items-center">
          <h3 className="text-center text-lg font-medium">
            Sorry, we are unable to load products at this time. Please refresh
            the page or try again later
          </h3>

          <div className="flex items-center gap-3">
            <Button
              className="mt-10"
              onClick={() => window.location.reload()}
              variant={"outline"}
            >
              Refresh
            </Button>
            <Button className="mt-10" onClick={() => navigate("/support")}>
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loader className="mt-10" />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-screen">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4" onClick={() => navigate("create")}>
            Add Product
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  <img
                    alt={product.productImages[0]?.alt || product.productTitle}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.productImages[0]?.url}
                    width="64"
                  />
                </TableCell>

                <TableCell className="font-medium">
                  <a
                    href={`${FRONTEND_URL}/product/${product.productSlug}`}
                    target="_blank"
                    className="hover:underline"
                  >
                    {product.productTitle}
                  </a>
                </TableCell>

                <TableCell>
                  <Badge variant={product.isActive ? "outline" : "destructive"}>
                    {product.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {formatPrice(product.salePrice)}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {product.salesCount}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {formatDate(product.createdAt, {
                    format: "numeric",
                  })}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`${product.productId.toLowerCase()}/edit`)
                        }
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}

export default AllProducts;
