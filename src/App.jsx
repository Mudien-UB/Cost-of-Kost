import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import LandingPageApp from './landing-page/LandingPageApp';
import DashboardApp from './dashboard/DashboardApp';
import AuthApp from './authentication/AuthApp';

function App() {

  const route = [
    {
      path: '/*',
      element: <LandingPageApp />
    },
    {
      path: '/dashboard/*',
      element: <DashboardApp />
    },{
      path: '/auth/*',
      element: <AuthApp />
    }
  ];

  return (
    <BrowserRouter>
      <Routes>
        {route.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}

      </Routes>
    </BrowserRouter>
  )
}

export default App
