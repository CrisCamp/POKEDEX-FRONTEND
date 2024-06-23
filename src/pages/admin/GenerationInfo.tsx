import React, { useState, useEffect } from "react";
import styles from "../../styles/pages_styles/CRUD.module.css";
import { API } from "../../utils/constants";
import { Generations } from "../../types/types";
import AddGeneration from "../../components/fields/generation_fields/AddGeneration";
import EditGeneration from "../../components/fields/generation_fields/EditGeneration";

const GenerationInfo = () => {
  const [generations, setGenerations] = useState<Generations[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAddGeneration, setShowAddGeneration] = useState(false);
  const [editGenerationId, setEditGenerationId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        const response = await fetch(`${API}generations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las generaciones");
        }

        const data = await response.json();
        setGenerations(data);
      } catch (error) {
        console.error("Error al obtener las generaciones:", error);
        setError("Error al obtener las generaciones");
      }
    };

    fetchGenerations();
  }, []);

  const handleEdit = (id: string) => {
    setEditGenerationId(id); // Establecer el ID de la Generación que se va a editar
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado");
      }

      const response = await fetch(`${API}generations/id/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la generación");
      }

      // Actualizar la lista de generaciones después de eliminar
      const updatedGenerations = generations.filter(
        (generation) => generation._id !== id
      );
      setGenerations(updatedGenerations);
      alert("Generación eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la generación:", error);
      alert("Hubo un error al eliminar la generación");
    }
  };

  const handleAddGeneration = () => {
    setShowAddGeneration(true); // Mostrar el formulario de agregar Generación
  };

  return (
    <div className={styles["pokedex-info"]}>
      <h2>Lista de Generaciones</h2>
      <button
        className={styles["pokedex-info-button"]}
        onClick={handleAddGeneration}
      >
        Agregar Generación
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Num. Generación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generations.map((generation) => (
            <tr key={generation._id}>
              <td>{generation.generation}</td>
              <td>
                <button
                  className={styles["delete-button"]}
                  onClick={() => handleEdit(generation._id)}
                >
                  Editar
                </button>
                <button
                  className={styles["delete-button"]}
                  onClick={() => handleDelete(generation._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Renderizado condicional del componente de agregar */}
      {showAddGeneration && <AddGeneration />}

      {/* Renderizado condicional del componente de editar */}
      {editGenerationId && <EditGeneration generationId={editGenerationId} />}
    </div>
  );
};

export default GenerationInfo;
