import React, { useState, useEffect } from "react";
import { API } from "../../../utils/constants";

const EditEvolution = ({ evolutionId }: { evolutionId: string }) => {
  const initialFormState = {
    basePokemonId: "",
    evolvesToPokemonId: "",
    level: "",
    condition: "",
  };

  const [evolution, setEvolution] = useState(initialFormState);

  useEffect(() => {
    const fetchEvolution = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        const response = await fetch(`${API}evolutions/id/${evolutionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la evolución");
        }

        const data = await response.json();
        // Acceder correctamente al objeto anidado "evolution"
        const evolutionData = data.evolution;

        // Asegurar que los valores no sean undefined o null
        setEvolution({
          basePokemonId: evolutionData.basePokemonId || "",
          evolvesToPokemonId: evolutionData.evolvesToPokemonId || "",
          level:
            evolutionData.level !== undefined
              ? evolutionData.level.toString()
              : "",
          condition: evolutionData.condition || "",
        });
      } catch (error) {
        console.error("Error al obtener la evolución:", error);
        alert("Hubo un error al obtener la evolución");
      }
    };

    fetchEvolution();
  }, [evolutionId]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvolution({ ...evolution, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado");
      }

      const response = await fetch(`${API}evolutions/id/${evolutionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(evolution),
      });

      console.log(evolution);

      if (!response.ok) {
        throw new Error("Error al actualizar la evolución");
      }

      alert("Evolución actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la evolución:", error);
      alert("Hubo un error al actualizar la evolución");
    }
  };

  return (
    <div className="edit-evolution-form">
      <h2>Editar Evolución</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>ID Pokemon:</label>
          <input
            type="text"
            name="basePokemonId"
            value={evolution.basePokemonId}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>ID pokemon evolución:</label>
          <input
            type="text"
            name="evolvesToPokemonId"
            value={evolution.evolvesToPokemonId}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Nivel para la evolución:</label>
          <input
            type="text"
            name="level"
            value={evolution.level}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Condición:</label>
          <input
            type="text"
            name="condition"
            value={evolution.condition}
            onChange={onChange}
          />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditEvolution;
