import { useState, useEffect } from "react";

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsLoggedIn(!!storedToken);
    setRole(localStorage.getItem("role"));
    setToken(storedToken);
    setIsLoading(false);
  }, [isLoggedIn, role, token, isLoading]);

  const login = async ({ token, role }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setRole(role);
    setToken(token);
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    setToken("");
  };

  return { isLoading, isLoggedIn, role, token, login, logout };
}

export default useAuth;
