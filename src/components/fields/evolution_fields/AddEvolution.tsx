import React, { useState } from "react";
import { API } from "../../../utils/constants";

const AddEvolution = () => {
  const initialFormState = {
    basePokemonId: "",
    evolvesToPokemonId: "",
    level: "",
    condition: "",
  };

  const [evolution, setEvolution] = useState(initialFormState);

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

      const response = await fetch(`${API}evolutions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(evolution),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la evolución");
      }

      alert("Evolución agregada correctamente");
      setEvolution(initialFormState); // Limpiar el formulario después de agregar
    } catch (error) {
      console.error("Error al agregar la evolución:", error);
      alert("Hubo un error al agregar la evolución");
    }
  };

  return (
    <div className="add-evolution-form">
      <h2>Agregar Evolución</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>ID Pokémon:</label>
          <input
            type="text"
            name="basePokemonId" // Corrected name
            value={evolution.basePokemonId}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>ID Pokémon evolución:</label>
          <input
            type="text"
            name="evolvesToPokemonId" // Corrected name
            value={evolution.evolvesToPokemonId}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Nivel para la evolución:</label>
          <input
            type="text"
            name="level" // Corrected name
            value={evolution.level}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Condición:</label>
          <input
            type="text"
            name="condition" // Corrected name
            value={evolution.condition}
            onChange={onChange}
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddEvolution;
