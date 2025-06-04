import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import NotFoundPage from '../pages/NotFoundPage';
import DashboardLayout from './layouts/DashboardLayout';
import FinanceManagementPage from './pages/FinanceManagementPage';
import FinanceAnalistPage from './pages/FinanceAnalistPage';
import SavingTargetPage from './pages/SavingTargetPage';
import ExpensesReminderPage from './pages/ExpensesReminderPage';
import FinanceRecordingPage from './pages/FinanceRecordingPage';


export default function DashboardApp() {

  const route = [
    {
      path: '/',
      element: <Navigate to="/dashboard/recording" />
    },
    {
      path: 'recording',
      element: <FinanceRecordingPage />
    },
    {
      path: '/finance-management',
      element: <FinanceManagementPage />,
    },
    {
      path: '/finance-analitics',
      element: <FinanceAnalistPage />,
    },
    {
      path: '/goal-saving',
      element: <SavingTargetPage />,
    },
    {
      path: '/expenses-reminder',
      element: <ExpensesReminderPage />,
    }
  ];
  const similarRoute = [
    {
      path: '/home',
      redirectTo: <Navigate to="/dashboard/finance-management" /> 
    },{
      path: '*',
      redirectTo: <Navigate to="/dashboard/finance-management" />
    }
    
  ]

  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <Routes>
      {route.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}

      {similarRoute.map((item, index) => (
        <Route key={index} path={item.path} element={item.redirectTo} />
      ))}

    </Routes>
  )
}
