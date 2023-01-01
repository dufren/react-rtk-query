import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({ allowedRoles }) => {

    const location = useLocation()

    const isLoggedIn = useSelector(store => store.login.isLoggedIn)
    const role = useSelector(store => store.login.userInfo.role)

    const content2 = (
        isLoggedIn && allowedRoles.some(allowed => allowed.includes(role))
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    )
    return content2
}

export default RequireAuth