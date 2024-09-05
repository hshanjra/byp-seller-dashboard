import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import ProductImagesUploader from "../ProductImagesUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/constants/form";
import {
  createProductSchema,
  CreateProductSchemaType,
} from "@/validators/product-validator";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/http";
import { Product } from "@/types";
import { ProductConditionOptions, ProductStatusOptions } from "@/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface ProductFormProps {
  title?: string;
  buttonTitle?: string;
  product?: Product;
}

function ProductForm({ title, buttonTitle, product }: ProductFormProps) {
  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      category: product?.category?.id || "",
    },
  });

  const handleProductFormSubmit = (values: CreateProductSchemaType) => {
    console.log(values);
  };

  // Fetch categories
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  // Get Selected Category
  const selectedCategoryId = form.watch("category") as any;

  // Find the selected category
  const selectedCategory =
    categories &&
    categories.find((category) => category._id === selectedCategoryId);

  // Filter subcategories if available
  const subCategories =
    selectedCategory && selectedCategory?.subcategories.length > 0
      ? selectedCategory?.subcategories
      : [];

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleProductFormSubmit)}>
          <div className="flex items-center justify-between mb-5">
            {title && (
              <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
            )}

            <Button type="submit" className="flex items-center gap-2">
              <PlusCircle size={18} />
              {buttonTitle || "Save"}
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-6">
            <div className="flex flex-col gap-5 sm:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    This information will be displayed publicly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="productTitle"
                      label="Product Title"
                      placeholder="Gamer Gear Pro Controller"
                    />

                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="productBrand"
                      label="Brand Name"
                      placeholder="Honda"
                    />

                    <div className="sm:flex sm:items-start sm:gap-2">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="partNumber"
                        label="Part Number"
                        placeholder="HXT550"
                      />

                      <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="productCondition"
                        label="Condition"
                        placeholder="Select condition"
                      >
                        {ProductConditionOptions.map((condition, i) => (
                          <SelectItem key={i} value={condition}>
                            <p>{condition}</p>
                          </SelectItem>
                        ))}
                      </CustomFormField>
                    </div>

                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="shortDescription"
                      label="Short Description"
                      placeholder="Best Gaming Controller"
                    />

                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="longDescription"
                      label="Long Description"
                      placeholder="Write about your product"
                      className="h-80"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="category"
                      label="Category"
                      placeholder="Select category"
                    >
                      {categories &&
                        categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            <p>{category.categoryName}</p>
                          </SelectItem>
                        ))}
                    </CustomFormField>

                    {/* Subcategory */}
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="subCategory"
                      label="Subcategory (Optional)"
                      placeholder="Select subcategory"
                      disabled={subCategories.length === 0}
                    >
                      {subCategories.length > 0 &&
                        subCategories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            <p>{category.categoryName}</p>
                          </SelectItem>
                        ))}
                    </CustomFormField>
                  </div>
                </CardContent>
              </Card>

              {/* Stock & Price */}
              <Card>
                <CardHeader>
                  <CardTitle>Stock / Price / SKU</CardTitle>
                  <CardDescription>
                    Add the stock and price of your product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Regular Price (USD)</TableHead>
                        <TableHead>Sale Price (USD)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="sku"
                            // label="SKU"
                            placeholder="GGPC-001"
                            fieldType={FormFieldType.INPUT}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="productStock"
                            // label="Stock"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="regularPrice"
                            // label="Regular Price"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="salePrice"
                            // label="Regular Price"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Shipping */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping</CardTitle>
                  <CardDescription>
                    Add Shipping and product dimensions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Length (in mm)</TableHead>
                        <TableHead>Width (in mm)</TableHead>
                        <TableHead>Height (in mm)</TableHead>
                        <TableHead>Shipping Price (USD)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="productLength"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="productWidth"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="productHeight"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomFormField
                            control={form.control}
                            name="shippingPrice"
                            placeholder="0"
                            fieldType={FormFieldType.INPUT}
                            type="number"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Compatibility Matcher */}
              <Card>
                <CardHeader>
                  <CardTitle>Part Compatibility</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <CustomFormField
                    control={form.control}
                    name="isGenericProduct"
                    fieldType={FormFieldType.SKELETON}
                    label="Is this a generic product?"
                    renderSkeleton={(field) => (
                      <FormControl>
                        <RadioGroup
                          className="flex gap-6 items-center justify-center"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value={"true"} id="generic-true" />
                            <Label
                              htmlFor="generic-true"
                              className="cursor-pointer"
                            >
                              True
                            </Label>
                            <RadioGroupItem
                              value={"false"}
                              id="generic-false"
                            />
                            <Label
                              htmlFor="generic-false"
                              className="cursor-pointer"
                            >
                              False
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    )}
                  />

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="compatibleMake"
                    label="Compatible Make"
                    placeholder="Enter compatible make"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="compatibleModel"
                    label="Select Compatible Models"
                    // placeholder="Enter meta description"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="compatibleYear"
                    label="Select Compatible Years"
                    // placeholder="Enter meta keywords"
                  />
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardHeader>
                  <CardTitle>Product SEO</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="metaTitle"
                    label="Meta Title"
                    placeholder="Enter meta title"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="metaDescription"
                    label="Meta Description"
                    placeholder="Enter meta description"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="keywords"
                    label="Keywords"
                    placeholder="Enter meta keywords"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right */}
            <div className="sm:col-span-2 flex flex-col gap-5">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="isActive"
                      label="Product Status"
                      placeholder="Select status"
                    >
                      {ProductStatusOptions.map((status, i) => (
                        <SelectItem key={i} value={status}>
                          <p>{status}</p>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>
                </CardContent>
              </Card>
              {/* Images */}
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SKELETON}
                name="images"
                renderSkeleton={(field) => (
                  <FormControl>
                    <ProductImagesUploader
                      onChange={field.onChange}
                      files={field.value}
                      options={{
                        maxFiles: 3,
                        accept: {
                          "image/png": [".png"],
                          "image/jpeg": [".jpeg", ".jpg"],
                        },
                      }}
                    />
                  </FormControl>
                )}
              />
            </div>
            {/* Right End */}
          </div>
        </form>
      </Form>
    </section>
  );
}

export default ProductForm;
