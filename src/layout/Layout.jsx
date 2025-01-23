import React from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
import './Layout.css'

export default function Layout() {
    return (
        <div className='main-container'>
            <Header />
            <main className='content'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
