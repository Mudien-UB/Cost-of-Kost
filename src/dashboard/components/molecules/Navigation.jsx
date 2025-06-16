import React from 'react'
import { NavLink } from 'react-router'

const BASE_ROUTE = '/dashboard'

export default function Navigation({ isOpen, routes }) {

    

    return (
        <nav className='w-full flex flex-col gap-1 overflow-hidden'>
            {routes.map((route, index) => (
                <NavLink
                    key={index}
                    to={`${BASE_ROUTE}${route.route}`}
                    className={({ isActive }) =>
                        `lock p-4 font-bold text-nowrap text-2xl text-blue-100 
                        ${isOpen ? 'hover:text-blue-900 hover:bg-gray-200' : ''} 
                        ${isActive ? 'bg-blue-50 text-blue-900' : ''}`
                    }
                >
                    {isOpen && <span className='text-sm'>{route.name}</span>}
                </NavLink>
            ))}
        </nav>
    )
}
