import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import DashboardLayout from './layouts/DashboardLayout';
import FinanceManagementPage from './pages/FinanceManagementPage';


export default function DashboardApp() {

  const route = [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/test',
      element: <DashboardLayout />
    },
    {
      path: '/finance-management',
      element: <FinanceManagementPage />,
    },
    // {
    //   path: '/analitics',
    //   element: 'Analisa Keuangan',
    // },
    // {
    //   path: '/goal-saving',
    //   element: 'Target Tabungan',
    // },
    // {
    //   path: '/budget-planner',
    //   element: 'Rencana Anggaran',
    // }
  ];

  return (
    <Routes>
      {route.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}

      <Route path="*" element={<NotFoundPage navigate={"/dashboard/"} />} />

    </Routes>
  )
}
