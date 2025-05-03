import React from 'react'
import {  Route, Routes } from 'react-router'
import HeroPage from './pages/HeroPage';
import NotFoundPage from '../pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';


export default function LandingPageApp() {
    const route = [
        {
          path: '/',
          element: <HeroPage />
        },
        {
          path: '/about',
          element: <AboutPage />
        },
        {
          path: '/contact',
          element: <ContactPage />
        }
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
