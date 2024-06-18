import { useEffect, useState } from "react";
import "./GenerationsTable.css";

interface Generation {
  _id: string;
  generation: number;
}

// Hook personalizado para manejar la carga de datos desde la API
const useFetchGenerations = () => {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          //ruta no protegida
          "http://localhost:3000/api/v1/generations"
        );
        const data = await response.json();
        setGenerations(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching generations:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return { generations, loading };
};

export const GenerationsTable = () => {
  const { generations, loading } = useFetchGenerations();

  return (
    <>
      <div className="container">
        <h2>Generaciones de Pokémon</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="pokemon-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Generación</th>
              </tr>
            </thead>
            <tbody>
              {generations.map((generation) => (
                <tr key={generation._id}>
                  <td>{generation._id}</td>
                  <td>{generation.generation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default GenerationsTable;
