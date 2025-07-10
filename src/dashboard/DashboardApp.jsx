// src/dashboard/DashboardApp.jsx
import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import FinanceManagementPage from './pages/FinanceManagementPage';
import FinanceRecordingPage from './pages/FinanceRecordingPage';
import FinanceHistoryPage from './pages/FinanceHistoryPage';
import AnalyticsFinancePage from './pages/AnalyticsFinancePage';
import { useSelector } from 'react-redux';

export default function DashboardApp() {

  const user = useSelector(state => state.Auth);
  const navigate = useNavigate();

  if(!user){
    navigate('/auth/login');
    return;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/recording" />} />
      <Route path="recording" element={<FinanceRecordingPage />} />
      <Route path="/finance-management" element={<FinanceManagementPage />} />
      <Route path="/finance-history" element={<FinanceHistoryPage />} />
      <Route path="/analytics" element={<AnalyticsFinancePage />} />
      <Route path="*" element={<Navigate to="/dashboard/finance-management" />} />
    </Routes>
  );
}
