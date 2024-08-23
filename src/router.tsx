import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/Login";
import IndexPage from "@/pages/dashboard";
import OnboardingPage from "@/pages/onboarding";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProductsPage from "./pages/dashboard/Products";
import AuthLayout from "@/layouts/AuthLayout";
import RegisterPage from "@/pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    // Layout
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  { path: "/onboarding", element: <OnboardingPage /> },
]);

export default router;
