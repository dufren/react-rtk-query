import { Outlet } from 'react-router'
import { Link } from "react-router-dom"
import { BsDroplet } from "react-icons/bs"
import { routeTitles } from '../config/contents'
// BsDropletHalf, BsBagPlus, BsPersonPlus, BsPerson, BsBag, BsXCircle, BsGear
const Sidebar = () => {


    console.log(routeTitles)
    return (
        <div className="min-h-screen flex flex-row bg-gray-100">
            <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
                <div className="flex items-center justify-center h-20 shadow-md">
                    <h1 className="text-3xl uppercase text-gray-400"><BsDroplet /></h1>
                </div>
                <ul className="flex flex-col py-4">
                    {
                        routeTitles.map(title => (
                            <li key={title.id}>
                                <Link className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><BsDroplet /></span>
                                    <span className="text-sm font-medium">{title.name}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <Outlet />
            </div>
        </div >
    )
}

export default Sidebar