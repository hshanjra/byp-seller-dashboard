export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: Array<string>;
  isEmailVerified: boolean;
  merchantVerificationStatus: string | null;
  merchantAccountStatus: string | null;
}
