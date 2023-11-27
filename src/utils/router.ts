import {
  createBrowserRouter,
  // redirect
} from "react-router-dom";
import LandingPage from "../Pages/LandingPage/LandingPage";
import DashboardPage from "../Pages/Dashboard/Dashboard";
import CallbackPage from "../Pages/Callback/Callback";

// Mock function to check if the user is logged in
// // Replace this with your actual authentication logic
// const isLoggedIn = () => {
//   // Implement logic to check if the user is logged in
//   return true;
// };

// // Loader that redirects to the dashboard if the user is already logged in
// const loginLoader = async () => {
//   if (isLoggedIn()) {
//     return redirect("/dashboard");
//   }
//   // Proceed to the landing page if not logged in
// };

// // Loader that checks for authentication before accessing a protected route
// const protectedLoader = async () => {
//   if (!isLoggedIn()) {
//     return redirect("/");
//   }
//   // Proceed to the protected route if logged in
// };

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
    // loader: protectedLoader,
    Component: DashboardPage
  },
  {
    id: "callback",
    path: "/callback",
    // loader: loginLoader,
    Component: CallbackPage
  },
]);

export default router;
