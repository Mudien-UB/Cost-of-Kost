import React from 'react'
import { NavLink } from 'react-router'

const BASE_ROUTE = '/dashboard'

export default function Navigation({isOpen}) {

    const dashboardRoutes = [
        {
            route: '/transactions',
            name: 'Transaksi Keuangan',
        },
        {
            route: '/analitics',
            name: 'Analisa Keuangan',
        },
        {
            route: '/goal-saving',
            name: 'Target Tabungan',
        },
        {
            route: '/budget-planner',
            name: 'Rencana Anggaran',
        }
    ]

    return (
        <nav className='w-full flex flex-col gap-1 overflow-hidden'>
            {
                dashboardRoutes.map((route, index) => (
                    <NavLink key={index} to={`${BASE_ROUTE}${route.route}`} className={`lock p-4 font-bold text-nowrap text-2xl text-blue-100 ${isOpen && 'hover:text-blue-900 hover:bg-gray-200'} `}>
                        {isOpen && <span className='text-sm'>{route.name}</span>}
                    </NavLink>
                ))
            }
        </nav>
    )
}
