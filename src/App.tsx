import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import PokedexLogin from "./pages/PokedexLogin";

const App: React.FC = () => {
  return (
    <Router>
      <PokedexLogin />
    </Router>
  );
};

export default App;
