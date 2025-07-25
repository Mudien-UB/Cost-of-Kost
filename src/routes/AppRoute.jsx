// src/AppRoute.jsx
import { BrowserRouter, Routes, Route } from 'react-router';
import LandingPageApp from '../landing-page/LandingPageApp';
import DashboardApp from '../dashboard/DashboardApp';
import AuthApp from '../authentication/AuthApp';
import ProfileApp from '../profile/ProfileApp';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC */}
                <Route
                    path="/*"
                    element={
                        <PublicRoute>
                            <LandingPageApp />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/*"
                    element={
                        <PublicRoute>
                            <AuthApp />
                        </PublicRoute>
                    }
                />
                <Route 
                    path="/terms-of-service"
                    element={
                        <PublicRoute>
                            <TermsOfServicePage />
                        </PublicRoute>
                    }
                />
                <Route 
                    path="/privacy-policy"
                    element={
                        <PublicRoute>
                            <PrivacyPolicyPage />
                        </PublicRoute>
                    }
                />

                {/* PRIVATE */}
                <Route
                    path="/dashboard/*"
                    element={
                        <PrivateRoute>
                            <DashboardApp />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile/*"
                    element={
                        <PrivateRoute>
                            <ProfileApp />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
