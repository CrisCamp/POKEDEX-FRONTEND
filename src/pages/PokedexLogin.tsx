// src/pages/PokedexLogin.tsx

import React, { useState, useEffect } from "react";
import "../styles/pages_styles/PokedexLogin.css";
import LoginForm from "../components/LoginForm";
import { API } from "../utils/constants";
import AppRoutes from "../routes/AppRoutes";

const PokedexLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Email o contraseña incorrectos");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsLoggedIn(true);
      setUser(data.user);
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div className="pokedex-login">
          <LoginForm onLogin={handleLogin} />
        </div>
      ) : (
        <div className="pokedex-pokeInfo">
          <AppRoutes />
        </div>
      )}
    </div>
  );
};

export default PokedexLogin;
