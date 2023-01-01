import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"



const DashHeader = () => {
    const username = useSelector(store => store.login.userInfo.username)

    return (
        <div className='flex justify-between items-center bg-white p-2 shadow'>
            <Link to={"/dash"} className="text-3xl font-bold ml-10 md:ml-20 lg:ml-40">BRAND</Link>
            <div className='flex items-center'>
                <img src="https://picsum.photos/50/50" alt="avatar" className=' rounded-full' />
                <p className='text-lg font-semibold ml-4 mr-10 md:mr-20 lg:mr-40'>{username}</p>
            </div>
        </div>
    )
}

export default DashHeader