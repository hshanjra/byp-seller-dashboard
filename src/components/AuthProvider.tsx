import { User } from "@/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";
import {
  LoginSchemaType,
  RegisterSchemaType,
} from "@/validators/auth-validator";
import { SITE_METADATA } from "@/constants";

type AuthContext = {
  // authToken?: string | null;
  currentUser?: User | null;
  //   getUser: () => Promise<User | null>;
  handleLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  handleRegister: ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthContextProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthContextProps) {
  // const [authToken, setAuthToken] = useState<string | null>();
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await api.get("/auth/me");
        setCurrentUser(data);
      } catch (e: any) {
        setCurrentUser(null);

        if (e.response?.status === 401) {
          throw new Error("Email or password is incorrect!");
        }
      }
    }
    fetchUser();
  }, []);

  async function handleLogin(values: LoginSchemaType): Promise<void> {
    try {
      const { data } = await api.post("/auth/login", values);

      const token: string = data?.accessToken;

      // setAuthToken(token);

      // Decrypt access token to extract the user
      const decodedUser = jwtDecode<User>(token);

      setCurrentUser(decodedUser);

      return;
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error(`Couldn't find your ${SITE_METADATA.name} account.`);
      }

      if (error?.status === 401) {
        throw new Error("Email or password is incorrect!");
      }

      //   TODO: throw an error if user is blocked or tried too many attempts

      setCurrentUser(null);

      throw new Error("Something went wrong. Please try again later.");
    }
  }
  async function handleRegister(values: RegisterSchemaType) {
    try {
      const { data } = await api.post("/auth/register", values);

      // setAuthToken(data?.accessToken);
      // Decrypt access token to extract the user
      const decodedUser = jwtDecode(data?.accessToken);
      setCurrentUser(decodedUser as User);
      return;
    } catch {
      // setAuthToken(null);
      setCurrentUser(null);
    }
  }

  async function handleLogout() {
    try {
      await api.get("/auth/logout");
      setCurrentUser(null);
    } catch {
      setCurrentUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleLogin,
        handleLogout,
        // getUser,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
