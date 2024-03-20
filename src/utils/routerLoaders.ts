import { LoaderFunctionArgs, redirect } from "react-router-dom";

export function protectedLoader({ request }: LoaderFunctionArgs) {
    const token = localStorage.getItem("token");

    if (!token) {
        const params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect("/?" + params.toString());
    }

    return null;
}

export async function loginLoader() {
    const token = localStorage.getItem("token");

    if (token) {
        return redirect("/dashboard");
    }

    return null;
}
