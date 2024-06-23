import React, { useState, useEffect } from "react";
import { API } from "../../../utils/constants";

const EditGeneration = ({ generationId }: { generationId: string }) => {
  const initialFormState = {
    generation: "",
  };

  const [generation, setGeneration] = useState(initialFormState); // Renombrado

  useEffect(() => {
    const fetchGeneration = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        const response = await fetch(`${API}generations/id/${generationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la generacion");
        }

        const data = await response.json();

        // Acceder correctamente al objeto anidado "generation"
        const generationData = data.generation;

        // Asegurar de que los valores no sean undefined o null
        setGeneration({
          generation:
            generationData.generation !== undefined
              ? generationData.generation.toString()
              : "",
        });
      } catch (error) {
        console.error("Error al obtener la generacion:", error);
        alert("Hubo un error al obtener la generacion");
      }
    };

    fetchGeneration();
  }, [generationId]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneration({ ...generation, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado");
      }

      const response = await fetch(`${API}generations/id/${generationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(generation),
      });

      console.log(generation);

      if (!response.ok) {
        throw new Error("Error al actualizar la generacion");
      }

      alert("Generacion actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la generacion:", error);
      alert("Hubo un error al actualizar la generacion");
    }
  };

  return (
    <div className="edit-generation-form">
      <h2>Editar Generacion</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>ID Generacion:</label>
          <input
            type="number"
            name="generation" // Renombrado
            value={generation.generation}
            onChange={onChange}
          />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditGeneration;
