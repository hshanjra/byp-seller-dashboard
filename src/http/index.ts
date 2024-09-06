import api from "@/lib/api";
import { Category, Product } from "@/types";
import {
  OnboardingFormData,
  OnboardingSchema,
} from "@/validators/onboarding-validator";
import {
  createProductSchema,
  CreateProductSchemaType,
} from "@/validators/product-validator";

// Query to check if store with same slug exists
export async function checkStoreExists(
  slug: string
): Promise<boolean | undefined> {
  if (!slug) return;
  try {
    const { data } = await api.get(`/seller/store/${slug}`);
    if (data) return true;
  } catch (error: any) {
    if (error.status === 404) return false;
    return;
  }
}

// Seller onboard
export async function createSellerStore(v: OnboardingFormData) {
  const values = OnboardingSchema.parse(v);
  const formData: FormData = new FormData();

  // Append identity documents (files) if they exist
  if (values.identityDocs && values.identityDocs.length > 0) {
    values.identityDocs.forEach((file) => {
      formData.append("identityDocs", file); // Ensure the key matches backend expectations
    });
  }

  // Append other fields to FormData
  formData.append("displayName", values.displayName);
  formData.append("dateOfBirth", new Date(values.dateOfBirth).toISOString()); // Convert to ISO string for consistency
  formData.append("businessAddress[streetAddress]", values.street);
  formData.append("businessAddress[city]", values.city);
  formData.append("businessAddress[state]", values.state);
  formData.append("businessAddress[zipCode]", values.zip);
  formData.append("businessAddress[country]", "US");
  formData.append("accountType", values.accountType);
  formData.append("aboutSeller", values.about || "");
  formData.append("businessName", values.businessName);
  formData.append("businessEmail", values.businessEmail || "");
  formData.append("businessPhone", values.businessPhone || "");
  formData.append("businessLicense", values.businessLicense || "");
  formData.append(
    "businessLicenseExp",
    new Date(values.businessLicenseExp || "").toISOString()
  );
  formData.append("EIN", values.ein);
  formData.append("SSN", values.ssn);
  formData.append("returnPolicyTerms", values.returnPolicy || "");
  formData.append("shippingPolicyTerms", values.shippingPolicy || "");

  if (values.bankAccountType === "BUSINESS") {
    formData.append("bankAccountType", values.bankAccountType);
    formData.append("bankName", values.bankName);
    formData.append("accountHolderName", values.accountHolderName);
    formData.append("accountNumber", values.accountNumber);
    formData.append("routingNumber", values.routingNumber);
    formData.append("bankBic", values.bankBic);
    formData.append("bankIban", values.bankIban);
    formData.append("bankSwiftCode", values.bankSwiftCode);
    formData.append("bankAddress", values.bankAddress);
  }

  try {
    // make request to create store
    const { data: store } = await api.post("/seller/onboard", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (store) return true;
  } catch (error: any) {
    if (error.status === 409) {
      throw new Error("Store with the same name already exists");
    }

    throw error;
  }
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get("/seller/products");
    return data;
  } catch (error: any) {
    if (error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await api.get("/category");
    return data;
  } catch (error: any) {
    if (error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Create Product
export async function createProduct(
  values: CreateProductSchemaType
): Promise<Product> {
  const v = createProductSchema.parse(values);
  const formData: FormData = new FormData();

  // Append images if they exist
  if (v.images && v.images.length > 0) {
    v.images.forEach((file) => {
      formData.append("images", file);
    });
  }

  // Append other fields to FormData
  formData.append("productTitle", v.productTitle);
  formData.append("productBrand", v.productBrand);
  formData.append("shortDescription", v.shortDescription);
  formData.append("longDescription", v.longDescription);
  formData.append("keywords", v.keywords);
  formData.append("partNumber", v.partNumber);
  formData.append("sku", v.sku);
  formData.append("productLength", v.productLength.toString());
  formData.append("productWidth", v.productWidth.toString());
  formData.append("productHeight", v.productHeight.toString());
  formData.append("categoryId", v.category);
  formData.append("metaTitle", v.metaTitle);
  formData.append("metaDescription", v.metaDescription);
  formData.append("productStock", v.productStock.toString());
  formData.append("regularPrice", v.regularPrice.toString());
  formData.append("salePrice", v.salePrice.toString());
  formData.append(
    "shippingPrice",
    v.shippingPrice && v.shippingPrice >= 0 ? v.shippingPrice.toString() : "0"
  );
  formData.append("productCondition", v.productCondition);
  formData.append("isActive", v.isActive === "ACTIVE" ? "true" : "false");
  formData.append(
    "isGenericProduct",
    v.isGenericProduct === true ? "true" : "false"
  );

  if (!v.isGenericProduct) {
    formData.append("compatibleMake", v.compatibleMake);
    if (v.compatibleModels) {
      v.compatibleModels.forEach((model) => {
        formData.append("compatibleModel[]", model);
      });
    }

    if (v.compatibleSubmodels) {
      v.compatibleSubmodels.forEach((submodel) => {
        formData.append("compatibleSubmodel[]", submodel);
      });
    }

    if (v.compatibleYears) {
      v.compatibleYears.forEach((year) => {
        formData.append("compatibleYear[]", year.toString());
      });
    }
  }

  try {
    const { data } = await api.post("/seller/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    if (error.status === 400) {
      throw new Error("Please check all fields");
    }
    throw new Error("Something went wrong");
  }
}
