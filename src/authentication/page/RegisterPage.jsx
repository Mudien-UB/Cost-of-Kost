import React from 'react';
import FormRegister from '../components/FormRegister';
import { useNavigate } from 'react-router';

export default function RegisterPage() {
  const [status, setStatus] = React.useState(null); // 'loading', 'success', 'error'
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleRegister = (data) => {
    setStatus('loading');
    setError('');

    // Simple validation
    if (data.password !== data.confirmPassword) {
      setStatus('error');
      setError('Passwords do not match');
      return;
    }

    if (!data.termsAccepted) {
      setStatus('error');
      setError('You must agree to the terms');
      return;
    }

    // Simulasi registrasi
    setTimeout(() => {
      setStatus('success');
      console.log('User registered:', data);
      navigate('/dashboard');
    }, 2000);
  };

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

        {status === 'error' && (
          <p className="text-sm text-red-500 mt-4">{error}</p>
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
