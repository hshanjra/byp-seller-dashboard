import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SelectItem, SelectSeparator } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, PlusCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import ProductImagesUploader from "../ProductImagesUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/constants/form";
import {
  createProductSchema,
  CreateProductSchemaType,
} from "@/validators/product-validator";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/http";
import {
  CreateProductsFormDefaultValues,
  ProductConditionOptions,
  ProductStatusOptions,
  VEHICLE_ATTRIBUTES,
} from "@/constants";
import { Checkbox } from "../ui/checkbox";

interface CreateProductFormProps {
  title?: string;
  buttonTitle?: string;
}

function CreateProductForm({ title, buttonTitle }: CreateProductFormProps) {
  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: CreateProductsFormDefaultValues,
  });

  const handleProductFormSubmit = (values: CreateProductSchemaType) => {
    console.log(values);
  };

  // Fetch categories
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  // Form Elements
  const selectedCategoryId = form.watch("category") as any;
  const isGenericProduct = form.watch("isGenericProduct");
  const selectedMake = form.watch("compatibleMake");

  // Find the selected category
  const selectedCategory = categories?.find(
    (category) => category._id === selectedCategoryId
  );

  // Filter subcategories if available
  const subCategories =
    selectedCategory && selectedCategory?.subcategories.length > 0
      ? selectedCategory?.subcategories
      : [];

  /* COMPATIBILITY FIELDS */
  // const [selectedMake, selectedModels] = form.watch([
  //   "compatibleMake",
  //   "compatibleModels",
  // ]);

  const selectedModels =
    VEHICLE_ATTRIBUTES.find((vehicle) => vehicle.make === selectedMake)
      ?.models || [];

  // Reset form values when selected make changes
  // useEffect(() => {
  //   form.reset({
  //     compatibleMake: selectedMake,
  //     compatibleModels: [],
  //     compatibleSubmodels: [],
  //     compatibleYears: [],
  //   });
  // }, [selectedMake, form]);

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
              {/* Product Details */}
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

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Add multiple images to your product. Max 12 images (PNG,
                    JPG, JPEG, WebP).
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                            maxFiles: 12,
                            accept: {
                              "image/png": [".png"],
                              "image/jpeg": [".jpeg", ".jpg"],
                              "image/webp": [".webp"],
                            },
                          }}
                        />
                      </FormControl>
                    )}
                  />
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
                      {isLoading ? (
                        <div className="flex py-20 gap-1 justify-center items-center">
                          <Loader2
                            className="animate-spin text-primary"
                            size={20}
                          />
                          <p>Loading...</p>
                        </div>
                      ) : (
                        categories &&
                        categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            <p>{category.categoryName}</p>
                          </SelectItem>
                        ))
                      )}
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
                        subCategories.map((subcategory) => (
                          <SelectItem
                            key={subcategory._id}
                            value={subcategory._id}
                          >
                            <p>{subcategory.categoryName}</p>
                          </SelectItem>
                        ))}
                      <SelectSeparator />
                      <Button
                        onClick={() => form.resetField("subCategory")}
                        variant={"ghost"}
                        size={"sm"}
                        className="w-full flex items-center gap-2"
                      >
                        clear selection
                        <X className="size-4" />
                      </Button>
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
                    fieldType={FormFieldType.CHECKBOX}
                    label="This is a generic product (check this if you don't have any vehicle information)"
                  />

                  {!isGenericProduct && (
                    <div>
                      {/* Make */}
                      <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="compatibleMake"
                        label="Compatible Make"
                        placeholder="Select compatible make"
                      >
                        {VEHICLE_ATTRIBUTES.map((vehicle) => (
                          <SelectItem key={vehicle.make} value={vehicle.make}>
                            <p>{vehicle.make}</p>
                          </SelectItem>
                        ))}
                      </CustomFormField>

                      {/* FIXME: */}
                      {/* Compatible Models with Checkbox */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium">
                          Compatible Models
                        </h4>
                        <div className="flex flex-col gap-2 mt-2">
                          <FormField
                            control={form.control}
                            name="compatibleModels"
                            render={() => (
                              <FormItem>
                                {/* Wrap the list of FormField components inside a fragment */}
                                <>
                                  {selectedModels?.map((model) => (
                                    <FormField
                                      key={model.name}
                                      control={form.control}
                                      name="compatibleModels"
                                      render={({ field }) => {
                                        const value = field.value || []; // Ensure value is an array
                                        return (
                                          <FormItem className="flex flex-row items-start space-x-3">
                                            <FormControl>
                                              <Checkbox
                                                checked={value.includes(
                                                  model.name
                                                )}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([
                                                        ...value,
                                                        model.name,
                                                      ])
                                                    : field.onChange(
                                                        value.filter(
                                                          (val) =>
                                                            val !== model.name
                                                        )
                                                      );
                                                }}
                                              />
                                              <FormLabel className="font-normal">
                                                {model.name}
                                              </FormLabel>
                                            </FormControl>
                                          </FormItem>
                                        );
                                      }}
                                    />
                                  ))}
                                </>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Sub Models */}

                      {/* Years */}
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="compatibleYears"
                        label="Select Compatible Years"
                      />
                    </div>
                  )}
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

              <Button type="submit" className="flex items-center gap-2">
                <PlusCircle size={18} />
                {buttonTitle || "Save"}
              </Button>
            </div>
            {/* Right End */}
          </div>
        </form>
      </Form>
    </section>
  );
}

export default CreateProductForm;
