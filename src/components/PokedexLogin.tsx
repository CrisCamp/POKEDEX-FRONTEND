import React, { useState, useEffect } from "react";
import "./PokedexLogin.css";
import PokemonInfo from "./PokemonInfo";

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
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div className="pokedex-login">
          <LoginForm onLogin={handleLogin} />
        </div>
      ) : (
        <div className="pokedex-pokeInfo">
          <PokemonInfo />
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
};

const LoginForm = ({
  onLogin,
}: {
  onLogin: (email: string, password: string) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Por favor, introduce un email y una contraseña.");
      return;
    }
    onLogin(email, password);
  };

  return (
    <div className="pokedex-screen">
      <div className="pokedex-header">
        <div className="pokedex-logo">POKEDEX</div>
      </div>
      <div className="pokedex-body">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default PokedexLogin;
