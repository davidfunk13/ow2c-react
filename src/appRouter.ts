import { createBrowserRouter, redirect } from "react-router-dom";
import { AUTHENTICATION_STATE } from "./state/authenticationSlice";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import GamesPage from "./pages/Games/Games.tsx";
import CallbackPage from "./pages/Callback/Callback.tsx";
import { store } from "./app/store";

const isLoggedIn = (): boolean => {
    const state = store.getState();
    const isAuthenticated = state[AUTHENTICATION_STATE].isAuthenticated;
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
        ],
    },
    {
        path: "/callback",
        loader: alreadyLoggedInLoader,
        Component: CallbackPage
    },
]);

export default router;
