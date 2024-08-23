import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/Login";
import Dashboard from "@/pages/Dashboard";
import OnboardingPage from "@/pages/onboarding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/onboarding", element: <OnboardingPage /> },
]);

export default router;
