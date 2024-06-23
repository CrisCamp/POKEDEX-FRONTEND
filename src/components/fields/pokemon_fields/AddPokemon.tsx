import React, { useState } from "react";
import { API } from "../../../utils/constants";

const AddPokemon = () => {
  const initialFormState = {
    name: "",
    type: "",
    weight: "",
    height: "",
    generation: "",
  };

  const [pokemon, setPokemon] = useState(initialFormState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPokemon({ ...pokemon, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado");
      }

      // Convertir los valores de weight, height y generation a números
      const payload = {
        ...pokemon,
        weight: parseFloat(pokemon.weight),
        height: parseFloat(pokemon.height),
        generation: parseInt(pokemon.generation, 10),
      };

      const response = await fetch(`${API}pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar el Pokémon");
      }

      alert("Pokémon agregado correctamente");
      setPokemon(initialFormState); // Limpiar el formulario después de agregar
    } catch (error: any) {
      console.error("Error al agregar el Pokémon:", error);
      alert(error.message || "Hubo un error al agregar el Pokémon");
    }
  };

  return (
    <div className="add-pokemon-form">
      <h2>Agregar Pokémon</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={pokemon.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Tipo:</label>
          <input
            type="text"
            name="type"
            value={pokemon.type}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Peso:</label>
          <input
            type="number"
            name="weight"
            value={pokemon.weight}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Estatura:</label>
          <input
            type="number"
            name="height"
            value={pokemon.height}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Generación:</label>
          <input
            type="number"
            name="generation"
            value={pokemon.generation}
            onChange={onChange}
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddPokemon;
