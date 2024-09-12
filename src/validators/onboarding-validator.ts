import { z } from "zod";
import validator from "validator";

export const OnboardingSchema = z
  .object({
    accountType: z.enum(["BUSINESS", "INDIVIDUAL"]).default("BUSINESS"),
    dateOfBirth: z.coerce.date().optional(),
    ssn: z.coerce
      .number({ message: "Enter valid social security number (SSN)" })
      .max(9, "Enter valid social security number (SSN)")
      .optional(),
    businessName: z.string().max(100, "Business name is too long"),
    businessLicense: z.string().optional(),
    businessLicenseExp: z.coerce.date().optional(),
    ein: z.coerce
      .number({ message: "Enter valid Employer Identification Number (EIN)" })
      .optional(),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip is required"),
    country: z.string().min(1, "Country is required"),
    displayName: z
      .string()
      .min(5, "Store name is too short, at least 5 characters are required")
      .max(100, "Store name is too long"),
    businessEmail: z.string().optional(),
    businessPhone: z.coerce
      .number()
      // .max(16, "Phone number is too long")
      .optional()
      .refine((phone) => phone && validator.isMobilePhone(`${phone}`), {
        message: "Enter valid phone number",
      }),
    about: z.string().max(450, "About is too long").optional(),
    returnPolicy: z.string().max(1000, "Return policy is too long").optional(),
    shippingPolicy: z
      .string()
      .max(1000, "Shipping policy is too long")
      .optional(),
    identityDocs: z.custom<File[]>(),
    // Bank Details
    bankAccountType: z.enum(["INDIVIDUAL", "BUSINESS"]).default("BUSINESS"),
    bankName: z
      .string()
      .min(1, "Bank name is required")
      .max(100, "Bank name is too long"),
    accountHolderName: z
      .string()
      .min(1, "Account holder name is required")
      .max(100, "Account holder name is too long"),
    accountNumber: z.coerce
      .number({ message: "Enter valid account number" })
      // .max(100, "Account number is too long")
      .optional(),
    routingNumber: z.coerce
      .number({ message: "Enter valid routing number" })
      // .max(9, "Routing number should not be greater than 9 digits"),
      .optional(),
    bankBic: z.string().max(100, "Bank BIC is too long"),
    bankIban: z.string().max(100, "Bank IBAN is too long"),
    bankSwiftCode: z.string().max(100, "Bank Swift code is too long"),
    bankAddress: z
      .string()
      .min(1, "Bank address is required")
      .max(100, "Bank address is too long"),
  })
  .superRefine((data, ctx) => {
    if (!data.identityDocs || data.identityDocs.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Identity documents are required",
        path: ["identityDocs"],
      });
    }

    // Bank Details
    if (!data.accountNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Account number is required",
        path: ["accountNumber"],
      });
    }

    if (data.accountNumber && data.accountNumber.toString().length > 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Account number should not be greater than 20 digits",
        path: ["accountNumber"],
      });
    }

    if (!data.routingNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Routing number is required",
        path: ["routingNumber"],
      });
    }

    if (data.routingNumber && data.routingNumber.toString().length < 9) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Routing number should not be less than 9 digits",
        path: ["routingNumber"],
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

      if (data.ein && data.ein.toString().length !== 9) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter valid employer identification number",
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
      if (data.ssn && data.ssn.toString().length !== 9) {
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
