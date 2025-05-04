import React from 'react';
import { useNavigate } from 'react-router';
import FormLogin from '../components/FormLogin';

const FAKE_USER = {
    username: 'Fulan',
    email: 'Fulan@example.com',
    password: 'Fulan123',
};

export default function LoginPage() {
    const [status, setStatus] = React.useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = React.useState(null);
    const navigate = useNavigate();

    const handleLogin = ({ emailOrUsername, password }) => {
        setStatus('loading');
        setErrorMsg(null);

        setTimeout(() => {
            const isValidUser =
                (emailOrUsername === FAKE_USER.email || emailOrUsername === FAKE_USER.username) &&
                password === FAKE_USER.password;

            if (isValidUser) {
                setStatus('success');
                setTimeout(() => navigate('/dashboard'), 1000);
            } else {
                setStatus('error');
                setErrorMsg('Invalid email/username or password');
            }
        }, 2000);
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-blue-100 relative">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>

                <FormLogin onSubmit={handleLogin} isLoading={status === 'loading'} />

                {status === 'error' && <p className="text-sm text-red-500 mt-4">{errorMsg}</p>}
                {status === 'success' && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-md">
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <h1 className="text-4xl font-bold text-green-600 mb-2">Login Success</h1>
                            <p className="text-xl text-gray-600">Redirecting to dashboard...</p>
                        </div>
                    </div>
                )}


                <div className="mt-6 text-left">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/auth/register" className="text-blue-500 hover:text-blue-700">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
