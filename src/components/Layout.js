import { Outlet } from "react-router";
import DashHeader from "./DashHeader";
import {useSelector} from "react-redux"

const Layout = () => {
    
    const role = useSelector(store => store.userInfo)
    console.log(role);

    return (
        <div className="bg-gray-300 h-screen">
            <DashHeader />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout