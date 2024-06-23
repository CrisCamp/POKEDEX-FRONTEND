import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/PokedexLogin";
import DashPokemon from "../pages/public/DashPokemon";
import PokemonInfo from "../pages/admin/PokemonInfo";
import EvolutionInfo from "../pages/admin/EvolutionInfo";
import GenerationInfo from "../pages/admin/GenerationInfo";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout";

const AppRoutes: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dash-pokemon" /> : <Login />}
        />
        <Route path="/dash-pokemon" element={<DashPokemon />} />
        <Route
          path="/poke-info"
          element={
            <PrivateRoute isAdmin={!!user && user.role === "admin"}>
              <PokemonInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/evo-info"
          element={
            <PrivateRoute isAdmin={!!user && user.role === "admin"}>
              <EvolutionInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/gen-info"
          element={
            <PrivateRoute isAdmin={!!user && user.role === "admin"}>
              <GenerationInfo />
            </PrivateRoute>
          }
        />
        {/* Redirigir a la página de login si no se encuentra la ruta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
