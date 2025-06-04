import { useState, useCallback } from "react";


export const useAuth = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState(null);

  const login = useCallback(({ emailOrUsername, password }) => {
    setStatus("loading");
    setErrorMsg(null);

    setTimeout(() => {
      if (emailOrUsername && password) {
        const username = emailOrUsername.includes("@")
          ? emailOrUsername.split("@")[0]
          : emailOrUsername;

        const userId = Math.random().toString(36).substring(2, 15);
        const token = "fake-token";

        const user = {
          userId,
          username,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg("Invalid email or password");
      }
    }, 1500);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

  }, []);

  const resetStatus = useCallback(() => {
    setStatus("idle");
    setErrorMsg(null);
  }, []);

  return {
    login,
    logout,
    status,
    errorMsg,
    resetStatus,
  };
};
