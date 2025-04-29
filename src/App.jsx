import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import LandingPageApp from './landing-page/LandingPageApp';
import DashboardApp from './dashboard/DashboardApp';

function App() {

  const route = [
    {
      path: '/*',
      element: <LandingPageApp />
    },
    {
      path: '/dashboard/*',
      element: <DashboardApp />
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
