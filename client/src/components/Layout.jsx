import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import CookieConsent from './CookieConsent'
const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <CookieConsent />
        </>
    )
}

export default Layout