// App.tsx

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";
import "./App.css";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <div>
          <Layout>
            <AppRoutes />
          </Layout>
        </div>
      </Router>
    </>
  );
};
export default App;
