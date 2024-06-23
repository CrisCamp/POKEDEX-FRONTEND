import React, { useState, useEffect } from "react";
import { API } from "../../../utils/constants";

const EditPokemon = ({ pokemonId }: { pokemonId: string }) => {
  const initialFormState = {
    name: "",
    type: "",
    weight: "",
    height: "",
    generation: "",
  };

  const [pokemon, setPokemon] = useState(initialFormState);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        const response = await fetch(`${API}pokemons/id/${pokemonId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el Pokémon");
        }

        const data = await response.json();

        // Establecer los datos del Pokémon en el estado
        setPokemon({
          name: data.name,
          type: data.type,
          weight: data.weight,
          height: data.height,
          generation: data.generation.generation.toString(), // Convertir a cadena
        });
      } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
        alert("Hubo un error al obtener el Pokémon");
      }
    };

    fetchPokemon();
  }, [pokemonId]);

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

      const response = await fetch(`${API}pokemons/id/${pokemonId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...pokemon,
          generation: parseInt(pokemon.generation), // Convertir de nuevo a número antes de enviar
        }),
      });

      console.log(pokemon);

      if (!response.ok) {
        throw new Error("Error al actualizar el Pokémon");
      }

      alert("Pokémon actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el Pokémon:", error);
      alert("Hubo un error al actualizar el Pokémon");
    }
  };

  return (
    <div className="edit-pokemon-form">
      <h2>Editar Pokémon</h2>
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
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditPokemon;
