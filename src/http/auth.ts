import api from "@/lib/api";
import { LoginSchemaType } from "@/validators/auth-validator";

export const login = async (values: LoginSchemaType) => {
  try {
    const { data } = await api.post("/auth/login", values);
    // TODO: set the cookie
    return data;
  } catch (error: any) {
    // TODO: throw sentry error;

    if (error?.response?.status === 401) {
      throw new Error("Email or password is incorrect!");
    }

    if (error?.response?.status === 404) {
      throw new Error("Email or password is incorrect!");
    }

    return { data: null, error: error.message };
  }
};
