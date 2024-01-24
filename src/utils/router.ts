import { createBrowserRouter, redirect } from "react-router-dom";
import { store } from "../app/store";
import { AUTHENTICATION_STATE } from "../state/authenticationSlice";
import LandingPage from "../pages/LandingPage/LandingPage.page";
import Layout from "../layouts/Layout/Layout";
import Games from "../pages/Games/Games.page";
import Dashboard from "../pages/Dashboard/Dashboard.page";
import Callback from "../pages/Callback/Callback.page";

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
        Component: Layout,
        children: [
            { path: "", Component: Dashboard},
            { path: "games", Component: Games },
        ],
    },
    {
        path: "/callback",
        loader: alreadyLoggedInLoader,
        Component: Callback
    },
]);

export default router;
