import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/Login";
import IndexPage from "@/pages/dashboard";
import OnboardingPage from "@/pages/onboarding";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProductsPage from "./pages/dashboard/Products";
import AuthLayout from "@/layouts/AuthLayout";
import RegisterPage from "@/pages/auth/Register";
import OrdersPage from "@/pages/dashboard/Orders";
import FinancesPage from "@/pages/dashboard/Finances";
import StoreSettings from "@/pages/dashboard/settings/StoreSettings";
import AnalyticsPage from "@/pages/dashboard/Analytics";

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
        path: "products",
        element: <ProductsPage />,
      },

      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "finances",
        element: <FinancesPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "settings",
        children: [
          {
            path: "store",
            element: <StoreSettings />,
          },
        ],
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
