import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/PokedexLogin";
import GenerationsTable from "../pages/GenerationsTable";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/generation" element={<GenerationsTable />} />
    </Routes>
  );
};

export default AppRoutes;
