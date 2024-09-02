import { z } from "zod";

export const OnboardingSchema = z
  .object({
    accountType: z.enum(["BUSINESS", "INDIVIDUAL"]).default("BUSINESS"),
    dateOfBirth: z.date(),
    ssn: z.string().max(9, "Enter valid social security number (SSN)"),
    businessName: z.string().max(100, "Business name is too long"),
    businessLicense: z.string().optional(),
    businessLicenseExp: z.date().optional(),
    ein: z.string().max(9, "Enter valid EIN"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip is required"),
    country: z.string().min(1, "Country is required"),
    displayName: z.string().min(1, "Display name is required"),
    businessEmail: z.string().optional(),
    businessPhone: z.string().max(12, "Phone number is too long").optional(),
    about: z.string().optional(),
    returnPolicy: z.string().optional(),
    shippingPolicy: z.string().optional(),
    identityDocs: z.custom<File[]>(),
  })
  .superRefine((data, ctx) => {
    if (!data.identityDocs || data.identityDocs.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Identity documents are required",
        path: ["identityDocs"],
      });
    }

    if (data.accountType === "BUSINESS") {
      // if (!data.businessLicense) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Business license is required",
      //     path: ["businessLicense"],
      //   });
      // }
      // if (!data.businessLicenseExp) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Business license expiration date is required",
      //     path: ["businessLicenseExp"],
      //   });
      // }
      if (!data.ein) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Employer Identification Number (EIN) is required",
          path: ["ein"],
        });
      }

      if (!data.businessName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business name is required",
          path: ["businessName"],
        });
      }

      if (!data.businessEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business email is required",
          path: ["businessEmail"],
        });
      } else if (
        z.string().email().safeParse(data.businessEmail).success === false
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid business email",
          path: ["businessEmail"],
        });
      }

      if (!data.businessPhone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business phone number is required",
          path: ["businessPhone"],
        });
      }
    }

    if (data.accountType === "INDIVIDUAL") {
      if (!data.ssn) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Social security number (SSN) is required",
          path: ["ssn"],
        });
      }
      if (data.ssn.length !== 9) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter valid social security number (SSN)",
          path: ["ssn"],
        });
      }

      if (!data.dateOfBirth) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date of birth is required",
          path: ["dateOfBirth"],
        });
      }
    }
  });

export type OnboardingFormData = z.infer<typeof OnboardingSchema>;
