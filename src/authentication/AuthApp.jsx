import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'

export default function AuthApp() {

    const routes =[
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/register',
            element: <RegisterPage />
        },
        {
            path: '*',
            element: <Navigate to="/auth/login" />
        }
    ]

  return (
    <Routes>
        {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
        ))}

    </Routes>
  )
}
