import React, { useState } from "react";
import styles from "../styles/components_styles/LoginForm.module.css";
import UserForm from "./UserForm";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Por favor, introduce un email y una contraseña.");
      return;
    }
    // Llama a la función onLogin pasada desde PokedexLogin
    onLogin(email, password);
  };

  return (
    <div className={styles["pokedex-screen"]}>
      <div className={styles["pokedex-header"]}>
        <div className={styles["pokedex-logo"]}>POKEDEX</div>
      </div>
      <div className={styles["pokedex-body"]}>
        <h2>{showLoginForm ? "Iniciar Sesión" : "Registrarse"}</h2>
        {error && <div className={styles["error"]}>{error}</div>}
        {showLoginForm ? (
          <form onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <label>Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles["form-group"]}>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles["login-button"]} type="submit">
              Iniciar Sesión
            </button>
          </form>
        ) : (
          <div>
            <UserForm />
          </div>
        )}
        <div>
          <button className={styles["login-button"]} onClick={toggleForm}>
            {showLoginForm ? "Registrarse" : "Volver al inicio de sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
