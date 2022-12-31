import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const RequireAuth = () => {

    const location = useLocation()

    const isLoggedIn = useSelector(store => store.login.isLoggedIn)

    const content = isLoggedIn
        ? <Outlet />
        : <Navigate to="/" state={{ from: location }} replace />

    return content
}

export default RequireAuth