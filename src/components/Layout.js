import { Outlet } from "react-router";
import DashHeader from "./DashHeader";

const Layout = () => {

    return (
        <div className="bg-gray-300 min-h-screen">
            <DashHeader />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout