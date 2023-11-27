import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthStatus from "../../components/AuthStatus";

interface LayoutPageProps {

}

const LayoutPage: FC<LayoutPageProps> = () => {
    return (
        <div>
            Status: <AuthStatus />
            <ul>
                <li>
                    <Link to={"/dashboard"}>Protected Page</Link>
                </li>
            </ul>

            <Outlet />
        </div>
    );
};

export default LayoutPage;