// src/components/PokedexLogin.tsx
import React, { useState } from "react";
import "./PokedexLogin.css";

const PokedexLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.email === "email@ceti.mx" &&
      formData.password === "contraseña"
    ) {
      console.log("Login successful");
      // Aquí puedes redirigir al email a la página de inicio o hacer cualquier otra acción necesaria
    } else {
      setError("Email o contraseña incorrectos");
      // Configurar un temporizador para borrar el error después de 3 segundos
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="pokedex-login">
      <div className="pokedex-screen">
        <div className="pokedex-header">
          <div className="pokedex-logo">POKEDEX</div>
        </div>
        <div className="pokedex-body">
          <div className="pokedex-form">
            <h2>Iniciar Sesión</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="login-button">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexLogin;
