import api from "@/lib/api";
import {
  OnboardingFormData,
  OnboardingSchema,
} from "@/validators/onboarding-validator";

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
      return { error: "Store with the same name already exists" };
    }

    return { error: error.message || "An error occurred" };
  }
}
