import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/LandingPage";
import DashboardPage from "../Pages/Dashboard/Dashboard";
import CallbackPage from "../Pages/Callback/Callback";
// import { loginLoader, protectedLoader } from "./routerLoaders";

const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
        // loader: loginLoader,
      Component: LandingPage
    },
    {
      id: "dash",
      path: "/dashboard",
    //   loader: protectedLoader,
      Component: DashboardPage
    },
    {
      id: "callback",
      path: "/callback",
      Component: CallbackPage
    },
  ]);

  export default router;