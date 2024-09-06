import DashboardContent from "@/components/DashboardContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts } from "@/http";
import { formatDate, formatPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
  });

  if (error) {
    return (
      <DashboardContent title="Products">
        <p>Something went wrong</p>
      </DashboardContent>
    );
  }

  if (isLoading) {
    return (
      <DashboardContent title="Products">
        <p>Loading...</p>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent title="Products">
      {products && products.length > 0 ? (
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Newest
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Oldest</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={() => navigate("create")}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
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
                      <TableHead className="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Total Sales
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
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
                            alt={
                              product.productImages[0].alt ||
                              product.productTitle
                            }
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={product.productImages[0].url}
                            width="64"
                          />
                        </TableCell>

                        <TableCell className="font-medium">
                          {product.productTitle}
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline">
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
                          {formatDate(product.createdAt, { format: "numeric" })}
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(
                                    `${product.productId.toLowerCase()}/edit`
                                  )
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
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-[100vh -20%]">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no products
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <Button className="mt-4">Add Product</Button>
          </div>
        </div>
      )}
    </DashboardContent>
  );
}

export default ProductsPage;
