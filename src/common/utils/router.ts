import {
  createBrowserRouter,
  redirect
} from "react-router-dom";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Dashboard from "../../pages/Dashboard/Dashboard";
import DashboardPage from "../../pages/Dashboard/DashboardPage";
import GamesPage from "../../pages/Games/Games";
import CallbackPage from "../../pages/Callback/Callback";
import { store } from "../../app/store";

const isLoggedIn = (): boolean => {
  const state = store.getState();
  const isAuthenticated = state["state/authentication"].isAuthenticated;
  return isAuthenticated;
};

const alreadyLoggedInLoader = async (): Promise<Response | null> => {
  if (isLoggedIn()) {
    return redirect("/");
  }

  return null;
};

const protectedLoader = async (): Promise<Response | null> => {
  if (!isLoggedIn()) {
    return redirect("/login");
  }

  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    loader: alreadyLoggedInLoader,
    Component: LandingPage,
  },
  {
    path: "/",
    loader: protectedLoader,
    Component: Dashboard,
    children: [
      { path: "", Component: DashboardPage },
      { path: "games", Component: GamesPage },
      // ... other child routes ...
    ],
  },
  {
    path: "/callback",
    loader: alreadyLoggedInLoader,
    Component: CallbackPage
  },
]);

export default router;
