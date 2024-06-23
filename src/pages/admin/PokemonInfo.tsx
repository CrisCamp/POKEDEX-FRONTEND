import React, { useState, useEffect } from "react";
import { API } from "../../utils/constants";
import { Pokemons } from "../../types/types";
import AddPokemon from "../../components/fields/pokemon_fields/AddPokemon";
import EditPokemon from "../../components/fields/pokemon_fields/EditPokemon";
import styles from "../../styles/pages_styles/CRUD.module.css";

const PokemonInfo = () => {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAddPokemon, setShowAddPokemon] = useState(false); // Estado para mostrar el formulario de agregar
  const [editPokemonId, setEditPokemonId] = useState<string | null>(null); // Estado para el ID del Pokémon a editar

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        const response = await fetch(`${API}pokemons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los pokémones");
        }

        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        console.error(error);
        setError("Error al obtener los pokémones");
      }
    };

    fetchPokemons();
  }, []);

  const handleEdit = (id: string) => {
    setEditPokemonId(id); // Establecer el ID del Pokémon que se va a editar
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado");
      }

      const response = await fetch(`${API}pokemons/id/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el Pokémon");
      }

      // Actualizar la lista de pokemons después de eliminar
      const updatedPokemons = pokemons.filter((pokemon) => pokemon._id !== id);
      setPokemons(updatedPokemons);
      alert("Pokémon eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el Pokémon:", error);
      alert("Hubo un error al eliminar el Pokémon");
    }
  };

  const handleAddPokemon = () => {
    setShowAddPokemon(true); // Mostrar el formulario de agregar Pokémon
  };

  return (
    <div className={styles["pokedex-info"]}>
      <h2>Lista de Pokémones</h2>
      <button
        className={styles["pokedex-info-button"]}
        onClick={handleAddPokemon}
      >
        Agregar Pokémon
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID Pokemon</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Peso</th>
            <th>Altura</th>
            <th>Generación</th>
            <th>Pre-Evolución</th>
            <th>Evolución</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon._id}>
              <td>{pokemon._id}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.type}</td>
              <td>{pokemon.weight}</td>
              <td>{pokemon.height}</td>
              <td>{pokemon.generation.generation}</td>
              <td>
                {pokemon.preEvolutions.length > 0
                  ? pokemon.preEvolutions
                      .map((preEvolution) => preEvolution.name)
                      .join(", ")
                  : "N/A"}
              </td>
              <td>
                {pokemon.evolutions.length > 0
                  ? pokemon.evolutions
                      .map((evolution) => evolution.name)
                      .join(", ")
                  : "N/A"}
              </td>
              <td>
                <button
                  className={styles["delete-button"]}
                  onClick={() => handleEdit(pokemon._id)}
                >
                  Editar
                </button>
                <button
                  className={styles["delete-button"]}
                  onClick={() => handleDelete(pokemon._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Renderizado condicional del componente de agregar */}
      {showAddPokemon && <AddPokemon />}

      {/* Renderizado condicional del componente de editar */}
      {editPokemonId && <EditPokemon pokemonId={editPokemonId} />}
    </div>
  );
};

export default PokemonInfo;
