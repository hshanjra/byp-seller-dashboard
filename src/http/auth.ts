import api from "@/lib/api";
import { LoginSchemaType } from "@/validators/auth-validator";

export const login = async (values: LoginSchemaType) => {
  return await api.post("/auth/login", values);
  // try {
  //   const { data } = await api.post("/auth/login", values);
  //   // TODO: set the cookie
  //   return { data, error: null };
  // } catch (error: any) {
  //   // TODO: throw sentry error;
  //   // console.log(error);
  //   return { data: null, error: error.message };
  // }
};
