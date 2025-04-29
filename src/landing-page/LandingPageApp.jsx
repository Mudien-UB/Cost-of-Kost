import React from 'react'
import {  Route, Routes } from 'react-router'
import HeroPage from './pages/HeroPage';
import NotFoundPage from '../pages/NotFoundPage';


export default function LandingPageApp() {
    const route = [
        {
          path: '/',
          element: <HeroPage />
        },
      ];
  return (
      <Routes>
        {route.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
        
        <Route path="*" element={<NotFoundPage navigate={"/"} />} />

      </Routes>
    
  )
}
