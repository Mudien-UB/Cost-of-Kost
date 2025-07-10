import React from 'react'
import {  Route, Routes } from 'react-router'
import NotFoundPage from '../pages/NotFoundPage';
import UserProfilePage from './pages/UserProfilePage';
import SettingsPage from './pages/SettingsPage';


export default function ProfileApp() {
    const route = [
        {
          path: '/',
          element: <UserProfilePage />
        },
        {
            path: '/settings',
            element: <SettingsPage />
        }
    ]
  return (
      <Routes>
        {route.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
        
        <Route path="*" element={<NotFoundPage navigate={"/"} />} />

      </Routes>
    
  )
}
