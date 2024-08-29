export interface User {
  _id: string;
  fullName: string;
  roles: Array<string>;
  isEmailVerified: boolean;
  isMerchantVerified: boolean;
}
