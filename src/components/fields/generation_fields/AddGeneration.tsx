import React, { useState } from "react";
import { API } from "../../../utils/constants";

const AddGeneration = () => {
  const initialFormState = {
    generation: "",
  };

  const [generation, setGeneration] = useState(initialFormState);

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

      const response = await fetch(`${API}generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(generation),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la generacion");
      }

      alert("Generacion agregada correctamente");
      setGeneration(initialFormState); // Limpiar el formulario después de agregar
    } catch (error) {
      console.error("Error al agregar la generacion:", error);
      alert("Hubo un error al agregar la generacion");
    }
  };

  return (
    <div className="add-generation-form">
      <h2>Agregar Generacion</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Generacion:</label>
          <input
            type="number"
            name="generation" // Corrected name
            value={generation.generation}
            onChange={onChange}
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddGeneration;
