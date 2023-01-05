import { useState } from 'react'
import { Outlet } from 'react-router'
import { BsArrowLeftShort, BsDroplet, BsDropletHalf, BsBagPlus, BsPersonPlus, BsPerson, BsBag } from "react-icons/bs"


const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const sidebarOpenIcon = (
        <BsDroplet
            className="text-3xl w-full duration-300 mb-24"
        />
    )

    const sidebarClosedIcon = (
        <BsDropletHalf
            className='text-3xl w-full duration-300 mb-24'
        />
    )

    const sidebarOpenMenu = (
        <div>
            <div className='mb-24'>
                <p className='text-xl outline-none cursor-pointer rounded-full mb-5 hover:shadow-inner hover:bg-gray-100'>Products</p>
                <p className='text-xl outline-none cursor-pointer rounded-full hover:shadow-inner hover:bg-gray-100'>Users</p>
            </div>

            <div className=''>
                <p className='text-xl outline-none cursor-pointer rounded-full mb-5 hover:shadow-inner hover:bg-gray-100'>Add Product</p>
                <p className='text-xl outline-none cursor-pointer rounded-full hover:shadow-inner hover:bg-gray-100'>Add User</p>
            </div>
        </div>
    )

    const sidebarClosedMenu = (
        <div>
            <div className='mb-24'>
                <BsBag className='text-3xl w-full cursor-pointer mb-5' />
                <BsPerson className='text-3xl w-full cursor-pointer' />
            </div>

            <div className=''>
                <BsBagPlus className='text-3xl w-full cursor-pointer mb-5' />
                <BsPersonPlus className='text-3xl w-full cursor-pointer' />
            </div>
        </div>
    )



    return (
        <div className='flex'>
            <div className={`bg-gray-200 h-screen pt-9 border w-${isSidebarOpen ? "72" : "20"} duration-300 relative text-center`}>
                <div>
                    <div>
                        <BsArrowLeftShort
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`bg-white text-3xl rounded-full -right-3 absolute cursor-pointer duration-300 ${!isSidebarOpen && "rotate-180"}`}
                        />
                    </div>

                    <div className=''>
                        <div className=''>
                            {isSidebarOpen
                                ? sidebarOpenIcon
                                : sidebarClosedIcon
                            }
                        </div>
                        {isSidebarOpen
                            ? sidebarOpenMenu
                            : sidebarClosedMenu}
                    </div>
                </div>

                <div className='mt-96 flex justify-center items-center gap-5'>
                    <img src="https://picsum.photos/50/50" alt="avatar" className=' rounded-full' />
                    {isSidebarOpen && <p>Username</p>}
                </div>

            </div>
            <div className='p-9'><Outlet /></div>
        </div>
    )
}

export default Sidebar