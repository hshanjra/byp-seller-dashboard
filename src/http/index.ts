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
  console.log("Onboarding Form Data", v);
  const values = OnboardingSchema.parse(v);
  const formData: FormData = new FormData();

  if (values.identityDocs && values.identityDocs.length > 0) {
    const blobFiles = values.identityDocs.map((file) => {
      return new Blob([file], { type: file.type });
    });

    blobFiles.forEach((blobFile) => {
      formData.append("blobFile", blobFile);
    });
    values.identityDocs.forEach((file) => {
      formData.append("fileName", file.name);
    });
  }

  console.log("Form Data", formData);

  try {
    const sellerData = {
      ...values,
      dateOfBirth: new Date(values.dateOfBirth),
      identityDocs: formData,
    };
    const { data: store } = await api.post("/seller/onboard", sellerData);
    if (store) return true;
  } catch (error: any) {
    if (error.status === 409) {
      return { error: "Store with the same name already exists" };
    }

    console.log(error);

    return { error: error.message || "An error occurred" };
  }
}
