import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import FormLogin from "../components/FormLogin";

export default function LoginPage() {
  const { login, status, errorMsg, resetStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);


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
    <section className="flex items-center justify-center min-h-screen bg-blue-100 relative">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>

        <FormLogin onSubmit={login} isLoading={status === "loading"} />

        {status === "loading" && (
          <p className="text-sm text-gray-500 mt-4">Logging in...</p>
        )}

        {status === "error" && (
          <p className="text-sm text-red-500 mt-4">{errorMsg}</p>
        )}

        {status === "success" && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-md">
            <div className="text-center px-10 py-6 bg-white rounded-lg shadow-md">
              <h1 className="text-4xl font-bold text-green-600 mb-2">
                Login Success
              </h1>
              <p className="text-xl text-gray-600">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 text-left">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-blue-500 hover:text-blue-700">
              Register here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
