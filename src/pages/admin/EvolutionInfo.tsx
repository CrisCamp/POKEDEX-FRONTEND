import React, { useState, useEffect } from "react";
import styles from "../../styles/pages_styles/CRUD.module.css";
import { API } from "../../utils/constants";
import { Evolutions } from "../../types/types";
import AddEvolution from "../../components/fields/evolution_fields/AddEvolution";
import EditEvolution from "../../components/fields/evolution_fields/EditEvolution";

const EvolutionInfo = () => {
  const [evolutions, setEvolutions] = useState<Evolutions[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAddEvolution, setShowAddEvolution] = useState(false);
  const [editEvolutionId, setEditEvolutionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        const response = await fetch(`${API}evolutions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las evoluciones");
        }

        const data = await response.json();
        setEvolutions(data);
      } catch (error) {
        console.error("Error al obtener las evoluciones:", error);
        setError("Error al obtener las evoluciones");
      }
    };

    fetchEvolutions();
  }, []);

  const handleEdit = (id: string) => {
    setEditEvolutionId(id); // Establecer el ID de la Evolución que se va a editar
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado");
      }

      const response = await fetch(`${API}evolutions/id/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la evolución");
      }

      // Actualizar la lista de evoluciones después de eliminar
      const updatedEvolutions = evolutions.filter(
        (evolution) => evolution.id !== id
      );
      setEvolutions(updatedEvolutions);
      alert("Evolución eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la evolución:", error);
      alert("Hubo un error al eliminar la evolución");
    }
  };

  const handleAddEvolution = () => {
    setShowAddEvolution(true); // Mostrar el formulario de agregar Evolución
  };

  return (
    <div className={styles["pokedex-info"]}>
      <h2>Lista de Evoluciones</h2>
      <button
        className={styles["pokedex-info-button"]}
        onClick={handleAddEvolution}
      >
        Agregar Evolución
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID Pokémon</th>
            <th>ID Pokémon Evolución</th>
            <th>Nivel para Evolución</th>
            <th>Condición</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {evolutions.map((evolution) => (
            <tr key={evolution.id}>
              <td>{evolution.basePokemonId}</td>
              <td>{evolution.evolvesToPokemonId}</td>
              <td>{evolution.level}</td>
              <td>{evolution.condition}</td>
              <td>
                <button
                  className={styles["delete-button"]}
                  onClick={() => handleEdit(evolution.id)}
                >
                  Editar
                </button>
                <button
                  className={styles["delete-button"]}
                  onClick={() => handleDelete(evolution.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Renderizado condicional del componente de agregar */}
      {showAddEvolution && <AddEvolution />}

      {/* Renderizado condicional del componente de editar */}
      {editEvolutionId && <EditEvolution evolutionId={editEvolutionId} />}
    </div>
  );
};

export default EvolutionInfo;
