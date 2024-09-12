export const SITE_METADATA = {
  name: "buyurparts",
  siteName: "Buyurparts.com",
  title: "Buy parts for your vehicle - buyurparts.com",
  description:
    "Buy auto parts and accessories for your Vehicle | Purchase across hundreds of Brands | Buy Ur Parts",
  url: "https://buyurparts.com",
  image: "https://buyurparts.com/logo.png",
  twitter: "@buyurparts",
  facebook: "buyurparts",
  instagram: "buyurparts",
  linkedin: "buyurparts",
  email: "info@buyurparts.com",
  supportEmail: "support@buyurparts.com",
  phone: "+1 1234 5678 90",
  address: {
    line1: "1230 Maecenas Street Road",
    line2: "",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  },
};

export const AccountTypeOptions = ["BUSINESS", "INDIVIDUAL"];

export const AccountStatusOptions = ["ACTIVE", "INACTIVE", "BLOCKED"];

export const VerificationStatusOptions = ["PENDING", "APPROVED", "REJECTED"];

export const ProductConditionOptions = ["NEW", "USED", "REFURBISHED"];
export const ProductStatusOptions = ["ACTIVE", "INACTIVE"];

export const OnboardingFormDefaultValues = {
  accountType: AccountTypeOptions[0] as any,
  // dateOfBirth: undefined,
  // ssn: 0,
  businessName: "",
  businessLicense: "",
  // ein: undefined,
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  displayName: "",
  businessEmail: "",
  // businessPhone: undefined,
  about: "",
  returnPolicy: "",
  shippingPolicy: "",
  identityDocs: [],
  bankAccountType: AccountTypeOptions[0] as any,
  bankName: "",
  accountHolderName: "",
  // accountNumber: undefined,
  // routingNumber: undefined,
  bankBic: "",
  bankIban: "",
  bankSwiftCode: "",
  bankAddress: "",
};

export enum StatusOptions {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum ProductCondition {
  NEW = "NEW",
  USED = "USED",
  REFURBISHED = "REFURBISHED",
}

export const ProductsFormDefaultValues = {
  productTitle: "",
  metaTitle: "",
  metaDescription: "",
  productBrand: "",
  shortDescription: "",
  longDescription: "",
  keywords: "",
  partNumber: "",
  sku: "",
  productLength: 0,
  productWidth: 0,
  productHeight: 0,
  shippingPrice: 0,
  category: "",
  subCategory: "",
  productStock: 1,
  regularPrice: 0,
  salePrice: 0,
  images: [],
  productCondition: ProductCondition.NEW,
  isActive: StatusOptions.ACTIVE,
  isGenericProduct: false,
  compatibleMake: "",
  compatibleModels: [],
  compatibleSubmodels: [],
  compatibleYears: [],
};

export const US_STATES = [
  { value: "AL", name: "Alabama", abbr: "AL" },
  { value: "AK", name: "Alaska", abbr: "AK" },
  { value: "AZ", name: "Arizona", abbr: "AZ" },
  { value: "AR", name: "Arkansas", abbr: "AR" },
  { value: "CA", name: "California", abbr: "CA" },
  { value: "CO", name: "Colorado", abbr: "CO" },
  { value: "CT", name: "Connecticut", abbr: "CT" },
  { value: "DE", name: "Delaware", abbr: "DE" },
  { value: "FL", name: "Florida", abbr: "FL" },
  { value: "GA", name: "Georgia", abbr: "GA" },
  { value: "HI", name: "Hawaii", abbr: "HI" },
  { value: "ID", name: "Idaho", abbr: "ID" },
  { value: "IL", name: "Illinois", abbr: "IL" },
  { value: "IN", name: "Indiana", abbr: "IN" },
  { value: "IA", name: "Iowa", abbr: "IA" },
  { value: "KS", name: "Kansas", abbr: "KS" },
  { value: "KY", name: "Kentucky", abbr: "KY" },
  { value: "LA", name: "Louisiana", abbr: "LA" },
  { value: "ME", name: "Maine", abbr: "ME" },
  { value: "MD", name: "Maryland", abbr: "MD" },
  { value: "MA", name: "Massachusetts", abbr: "MA" },
  { value: "MI", name: "Michigan", abbr: "MI" },
  { value: "MN", name: "Minnesota", abbr: "MN" },
  { value: "MS", name: "Mississippi", abbr: "MS" },
  { value: "MO", name: "Missouri", abbr: "MO" },
  { value: "MT", name: "Montana", abbr: "MT" },
  { value: "NE", name: "Nebraska", abbr: "NE" },
  { value: "NV", name: "Nevada", abbr: "NV" },
  { value: "NH", name: "New Hampshire", abbr: "NH" },
  { value: "NJ", name: "New Jersey", abbr: "NJ" },
  { value: "NM", name: "New Mexico", abbr: "NM" },
  { value: "NY", name: "New York", abbr: "NY" },
  { value: "NC", name: "North Carolina", abbr: "NC" },
  { value: "ND", name: "North Dakota", abbr: "ND" },
  { value: "OH", name: "Ohio", abbr: "OH" },
  { value: "OK", name: "Oklahoma", abbr: "OK" },
  { value: "OR", name: "Oregon", abbr: "OR" },
  { value: "PA", name: "Pennsylvania", abbr: "PA" },
  { value: "RI", name: "Rhode Island", abbr: "RI" },
  { value: "SC", name: "South Carolina", abbr: "SC" },
  { value: "SD", name: "South Dakota", abbr: "SD" },
  { value: "TN", name: "Tennessee", abbr: "TN" },
  { value: "TX", name: "Texas", abbr: "TX" },
  { value: "UT", name: "Utah", abbr: "UT" },
  { value: "VT", name: "Vermont", abbr: "VT" },
  { value: "VA", name: "Virginia", abbr: "VA" },
  { value: "WA", name: "Washington", abbr: "WA" },
  { value: "WV", name: "West Virginia", abbr: "WV" },
  { value: "WI", name: "Wisconsin", abbr: "WI" },
  { value: "WY", name: "Wyoming", abbr: "WY" },
];

export const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  // "application/pdf",
  // "application/msword",
  // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const VEHICLE_ATTRIBUTES = [
  {
    make: "BMW",
    models: [
      {
        name: "X5",
        years: ["2020", "2021", "2022"],
        subModels: ["X5", "X6", "X7"],
      },
      {
        name: "5 Series",
        years: ["2019", "2020", "2021"],
        subModels: ["5", "6", "7"],
      },
      {
        name: "3 Series",
        years: ["2019", "2020", "2021"],
        subModels: ["3", "4", "5"],
      },
    ],
  },
  {
    make: "Mercedes-Benz",
    models: [
      {
        name: "X5",
        years: ["2020", "2021", "2022"],
        subModels: ["X5", "X6", "X7"],
      },
      {
        name: "5 Series",
        years: ["2019", "2020", "2021"],
        subModels: ["5", "6", "7"],
      },
      {
        name: "3 Series",
        years: ["2019", "2020", "2021"],
        subModels: ["3", "4", "5"],
      },
    ],
  },
];
