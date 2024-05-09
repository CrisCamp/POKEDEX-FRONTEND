// App.tsx

import Login from "./components/PokedexLogin";
import GenerationsTable from "./components/GenerationsTable";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Actividad 2: Conección a API no protegida</h1>
        <GenerationsTable />
        <h1>
          Actividad 3: Conección a API con autenticación y almacenamiento de
          sesión con localStorage
        </h1>
        <Login />
      </div>
    </>
  );
}

export default App;
