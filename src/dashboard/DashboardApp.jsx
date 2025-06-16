import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import FinanceManagementPage from './pages/FinanceManagementPage';
import SavingTargetPage from './pages/SavingTargetPage';
import ExpensesReminderPage from './pages/ExpensesReminderPage';
import FinanceRecordingPage from './pages/FinanceRecordingPage';
import { useAuth } from '../authentication/hooks/useAuth';
import FinanceHistory from './pages/FinanceHistory';


export default function DashboardApp() {


  const { whoAmI, resetStatus } = useAuth();
  const navigate = useNavigate();

 

  useEffect(() => {
  const checkAuth = async (tokenAuth) => {
    try {

      if(tokenAuth){
        await whoAmI();
      }else{
        navigate('/auth/login');
      }
      
      
    } catch {
      navigate('/auth/login'); 
    } finally {
      resetStatus();
    }
  };
   const token = localStorage.getItem('token');

  checkAuth(token);
}, []);



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
      path: '/finance-history',
      element: <FinanceHistory />,
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
