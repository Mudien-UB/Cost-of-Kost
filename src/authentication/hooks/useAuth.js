import { useState, useCallback } from "react";
import { authApi } from "../../api/backend/authApi";

export const useAuth = () => {
  const [status, setStatus] = useState("idle"); 
  const [errorMsg, setErrorMsg] = useState(null);

  const login = useCallback(async ({ emailOrUsername, password }) => {
    setStatus("loading");
    setErrorMsg(null);

    try {
      const response = await authApi.login(emailOrUsername, password);
      const { user, access_token } = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", access_token);

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMsg(
        error.response?.data?.message || "Login failed, please try again"
      );
    }
  }, []);

  const register = useCallback(async ({ name, username, email, password }) => {
    setStatus("loading");
    setErrorMsg(null);

    try {
      const response = await authApi.register(name, username, email, password);
      const { user, access_token } = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", access_token);

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMsg(
        error.response?.data?.message || "Register failed, please try again"
      );
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  const resetStatus = useCallback(() => {
    setStatus("idle");
    setErrorMsg(null);
  }, []);

  return {
    login,
    register,
    logout,
    status,
    errorMsg,
    resetStatus,
  };
};
