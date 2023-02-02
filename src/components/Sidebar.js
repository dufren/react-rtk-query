import { Outlet } from 'react-router'
import { Link } from "react-router-dom"
import { BsDroplet, BsDropletHalf, BsBagPlus, BsPersonPlus, BsPerson, BsBag, BsXCircle, BsGear } from "react-icons/bs"

const Sidebar = () => {

    return (
        <div class="min-h-screen flex flex-row bg-gray-100">
            <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
                <div class="flex items-center justify-center h-20 shadow-md">
                    <h1 class="text-3xl uppercase text-gray-400"><BsDroplet /></h1>
                </div>
                <ul class="flex flex-col py-4">
                    <li>
                        <Link class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><BsDropletHalf /></span>
                            <span class="text-sm font-medium">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><BsBag /></span>
                            <span class="text-sm font-medium">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><BsBagPlus /></span>
                            <span class="text-sm font-medium">Add Product</span>
                        </Link>
                    </li>
                    <li>
                        <Link class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><BsPerson /></span>
                            <span class="text-sm font-medium">Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><BsPersonPlus /></span>
                            <span class="text-sm font-medium">Add User</span>
                        </Link>
                    </li>
                    <li className='mt-96'>
                        <Link class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><BsGear /></span>
                            <span class="text-sm font-medium">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><BsXCircle /></span>
                            <span class="text-sm font-medium">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar