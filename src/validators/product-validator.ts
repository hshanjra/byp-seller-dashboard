import { z } from "zod";

export const createProductSchema = z
  .object({
    productTitle: z
      .string()
      .min(1, "Product title is required")
      .max(200, "Product title is too long"),
    metaTitle: z
      .string()
      .min(1, "Meta title is required")
      .max(60, "Meta title is too long"),
    metaDescription: z
      .string()
      .min(1, "Meta description is required")
      .max(160, "Meta description is too long"),
    productBrand: z
      .string()
      .min(1, "Brand name is required")
      .max(50, "Brand name is too long"),
    shortDescription: z
      .string()
      .min(1, "Short description is required")
      .max(500, "Short description is too long"),

    longDescription: z
      .string()
      .min(1, "Long description is required")
      .max(1500, "Long description is too long"),

    keywords: z
      .string()
      .min(1, "Keywords are required")
      .max(50, "Keywords are too long"),
    partNumber: z
      .string()
      .min(1, "Part number is required")
      .max(50, "Part number is too long"),

    sku: z.string().min(1, "SKU is required").max(20, "SKU is too long"),
    productLength: z.coerce
      .number()
      .positive()
      .min(1, "Length is required")
      .max(100, "Product length is too long"),
    productWidth: z.coerce
      .number()
      .positive()
      .min(1, "Width is required")
      .max(100, "Product width is too long"),
    productHeight: z.coerce
      .number()
      .positive()
      .min(1, "Height is required")
      .max(100, "Product height is too long"),
    shippingPrice: z.coerce
      .number()
      .positive()
      .max(100, "Shipping price must be less than $100")
      .optional(),
    category: z.string().min(1, "Please select a category"),
    subCategory: z.string().optional(),
    productStock: z.coerce
      .number({ message: "Please enter a valid stock" })
      .min(1, "Please enter a valid stock")
      .max(100, "Max 100"),
    regularPrice: z.coerce
      .number({ message: "Please enter price" })
      .positive()
      .min(1, "Please enter price"),
    salePrice: z.coerce
      .number({ message: "Please enter price" })
      .positive()
      .min(1, "Please enter price"),
    images: z.custom<File[]>(),
    productCondition: z
      .enum(["NEW", "USED", "REFURBISHED"], {
        message: "Please select condition from the list",
      })
      .default("NEW"),
    isActive: z.enum(["ACTIVE", "INACTIVE"], {
      message: "Please select status from the list",
    }),
    isGenericProduct: z.coerce.boolean().default(false),
    compatibleMake: z.string().min(1, "Please select a make"),
    compatibleModels: z.array(z.string().min(1, "Please select a model")),
    compatibleSubmodels: z.array(
      z.string().min(1, "Please select a sub model")
    ),
    //   compatibleEngine: z.array(z.string().min(1, "Please select a engine")),
    compatibleYears: z.array(z.number().min(1, "Please select a year")),
  })
  .superRefine((data, ctx) => {
    if (!data.images || data.images.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Please upload at least one image",
        path: ["images"],
      });
    }
  });

export type CreateProductSchemaType = z.infer<typeof createProductSchema>;
