import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  registerUser
} from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <-- Initialize navigate hook here
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await loginUser(email, password);

      localStorage.setItem("token", res.data.token);

      const userData = { email };

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);
      
      navigate("/"); // <-- Redirects the user right after state is set!

      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        password,
        role: "ROLE_USER"
      };

      const res = await registerUser(payload);

      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // <-- Optional: sends them back to login on logout
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};