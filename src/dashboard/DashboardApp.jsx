import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import FinanceManagementPage from './pages/FinanceManagementPage';
import FinanceAnalistPage from './pages/FinanceAnalistPage';
import SavingTargetPage from './pages/SavingTargetPage';
import ExpensesReminderPage from './pages/ExpensesReminderPage';
import FinanceRecordingPage from './pages/FinanceRecordingPage';
import { useAuth } from '../authentication/hooks/useAuth';


export default function DashboardApp() {


  const { whoAmI, status, errorMsg, resetStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  const checkAuth = async () => {
    await whoAmI();
    if (status === "success") {
      navigate('/auth/login');
    }
    resetStatus();
  };
  checkAuth();
}, [status]);


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
    return <Navigate to="/auth/login" />
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
