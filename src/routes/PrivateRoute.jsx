// src/routes/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useAuth } from '../authentication/hooks/useAuth';

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { whoAmI, resetStatus } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
        console.log('whoAmI dipanggil')
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth/login');
          return;
        }

        await whoAmI();
      } catch (error) {
        console.log('Auth error:', error);
        navigate('/auth/login');
      } finally {
        resetStatus();
        setLoading(false);
      }
    };

    checkAuth();
  }, [whoAmI, navigate, resetStatus]);

  if (loading) return <div>Loading...</div>;

  return children;
}
