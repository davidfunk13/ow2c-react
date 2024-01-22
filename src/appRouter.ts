import { createBrowserRouter, redirect } from "react-router-dom";
import { AUTHENTICATION_STATE } from "./state/authenticationSlice";
import { store } from "./app/store";
import LandingPage from "./pages/LandingPage/LandingPage.page";
import Layout from "./layouts/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard.page.tsx";
import GamesPage from "./pages/Games/Games.page.tsx";
import CallbackPage from "./pages/Callback/Callback.page.tsx";

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
            { path: "", Component: Dashboard },
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
