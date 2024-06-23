import React, { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarUser from "./NavbarUser";
import Footer from "./Footer";
import styles from "../styles/components_styles/Layout.module.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const isAdmin = user?.role === "admin";

  return (
    <div className={styles.container}>
      {isAdmin ? <NavbarAdmin /> : <NavbarUser />}
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
