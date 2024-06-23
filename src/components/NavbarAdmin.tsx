// src/components/NavbarAdmin.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components_styles/Navbar.module.css";

interface User {
  username: string;
  // Add other user properties as needed
}

const NavbarAdmin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/dash-pokemon" className={styles.navLink}>
            Dash Pokemon
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/poke-info" className={styles.navLink}>
            Informacion Pokemon
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/evo-info" className={styles.navLink}>
            Informacion Evolucion
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/gen-info" className={styles.navLink}>
            Informacion Generacion
          </Link>
        </li>
        {isLoggedIn && (
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink} onClick={handleLogout}>
              Cerrar Sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
