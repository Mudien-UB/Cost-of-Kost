import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import FinanceManagementPage from './pages/FinanceManagementPage';
import SavingTargetPage from './pages/SavingTargetPage';
import ExpensesReminderPage from './pages/ExpensesReminderPage';
import FinanceRecordingPage from './pages/FinanceRecordingPage';
import { useAuth } from '../authentication/hooks/useAuth';
import FinanceHistoryPage from './pages/FinanceHistoryPage';

export default function DashboardApp() {
  const { whoAmI, resetStatus } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token'); // ambil token langsung
        if (!token) {
          navigate('/auth/login');
          return;
        }

        await whoAmI(); // jika error, akan masuk catch
        setAuthChecked(true);
      } catch {
        console.log("false berjalan")
        navigate('/auth/login');
        setAuthChecked(false);
      } finally {
        resetStatus();
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) return <div>Loading...</div>;

  const route = [
    { path: '/', element: <Navigate to="/dashboard/recording" /> },
    { path: 'recording', element: <FinanceRecordingPage /> },
    { path: '/finance-management', element: <FinanceManagementPage /> },
    { path: '/finance-history', element: <FinanceHistoryPage /> },
    { path: '/goal-saving', element: <SavingTargetPage /> },
    { path: '/expenses-reminder', element: <ExpensesReminderPage /> },
  ];

  const similarRoute = [
    { path: '/home', redirectTo: <Navigate to="/dashboard/finance-management" /> },
    { path: '*', redirectTo: <Navigate to="/dashboard/finance-management" /> },
  ];

  return (
    <Routes>
      {route.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
      {similarRoute.map((item, index) => (
        <Route key={index} path={item.path} element={item.redirectTo} />
      ))}
    </Routes>
  );
}
