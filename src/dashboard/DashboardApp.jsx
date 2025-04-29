import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import DashboardLayout from './layouts/DashboardLayout';


export default function DashboardApp() {

    const route = [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path:'/test',
          element: <DashboardLayout />
        }
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
