import React, { useEffect, useState } from 'react';
import FormRegister from '../components/FormRegister';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth'; // pastikan path ini benar

export default function RegisterPage() {
  const { register, status, errorMsg, resetStatus } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async (data) => {
    setError(null);
    resetStatus(); // reset status sebelumnya

    // Validasi sederhana
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!data.termsAccepted) {
      setError('You must agree to the terms');
      return;
    }

    try {
      await register({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
      if (status === "success") {
          const timer = setTimeout(() => {
              resetStatus();
              navigate("/dashboard");
          }, 2000);
          
          return () => clearTimeout(timer);
      
      }
      console.log("Status:", status);
    }, [status, navigate, resetStatus]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Join us and start your journey with EduSims!
        </p>
        <p className="text-sm text-gray-600 my-4 text-right">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-500 hover:text-blue-700">
            Log In
          </a>
        </p>

        <FormRegister onSubmit={handleRegister} loading={status === 'loading'} />

        {(error || errorMsg) && (
          <p className="text-sm text-red-500 mt-4">{error || errorMsg}</p>
        )}

        {status === 'success' && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-md">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-xl font-bold text-green-600 mb-2">Registration Success</h1>
              <p className="text-sm text-gray-600">You can now log in.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
