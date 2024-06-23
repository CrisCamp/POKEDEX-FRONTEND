// src/components/NavbarUser.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components_styles/Navbar.module.css";

const Navbar: React.FC = () => {
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
          <Link to="/" className={styles.navLink} onClick={handleLogout}>
            Cerrar Sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
