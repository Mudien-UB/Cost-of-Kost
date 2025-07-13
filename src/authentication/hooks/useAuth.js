import { useState, useCallback } from "react";
import { authApi } from "../../api/backend/authApi";
import { useDispatch } from "react-redux";
import { login as loginAction, logout as logoutAction } from "../../redux/reducers/AuthSlice"

export const useAuth = () => {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  const login = useCallback(async ({ emailOrUsername, password }) => {
    setStatus("loading");
    setErrorMsg(null);

    try {
      const response = await authApi.login(emailOrUsername, password);

      const { accessToken } = response.data.data;
      localStorage.setItem("token", accessToken);

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMsg(
        error.response?.data?.message || "Login failed, please try again"
      );
      throw error;
    }
  }, [dispatch]);

  const register = useCallback(async ({ fullName, username, email, password }) => {
    setStatus("loading");
    setErrorMsg(null);

    try {
      const response = await authApi.register(fullName, username, email, password);
      const { accessToken } = response.data.data;
      localStorage.setItem("token", accessToken);

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMsg(
        error.response?.data?.message || "Register failed, please try again"
      );
      throw error;
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }

    localStorage.removeItem("token");
    dispatch(logoutAction());
  }, [dispatch]);

  const resetStatus = useCallback(() => {
    setStatus("idle");
    setErrorMsg(null);
  }, []);

  const whoAmI = useCallback(async () => {
    try {
      const response = await authApi.whoAmI();
      const {username} = response.data.data;
      dispatch(loginAction({
        username: username
      }));
      return response?.data?.data;
    } catch (error) {
      console.error("whoAmI failed:", error);
      throw error;
    }
  }, [dispatch]);

  const isEmailUsed = async (email) => {
    try{
      return await authApi.isEmailUsed(email);
    }catch (err) {
      return false;
    }
  }

  const isUsernameUsed = async (username) => {
    try{
      return await authApi.isUsernameUsed(username);
    }catch (err) {
      return false;
    }
  }

  return {
    login,
    register,
    logout,
    status,
    errorMsg,
    resetStatus,
    whoAmI,
    isEmailUsed,
    isUsernameUsed
  };
};
