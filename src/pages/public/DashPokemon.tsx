import React, { useState, useEffect } from "react";
import "../../styles/pages_styles/DashPokemon.css";
import { API } from "../../utils/constants";
import { Pokemons } from "../../types/types";

const DashPokemon = () => {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("name"); // Default filter type is by name

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        let url = `${API}pokemons/${filterType}/${searchTerm}`;
        if (!searchTerm) {
          url = `${API}pokemons`; // Fetch all pokemons if no search term
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los pokémones");
        }

        const data = await response.json();
        setPokemons(data);
        setError(null); // Limpiar error si la búsqueda tiene éxito
      } catch (error) {
        console.error(error);
        setError("Error al obtener los pokémones");
        setPokemons([]); // Limpiar pokemons en caso de error
      }
    };

    fetchPokemons();
  }, [searchTerm, filterType]); // Fetch whenever searchTerm or filterType changes

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  return (
    <div className="pokedex-container">
      <h2>Lista de Pokémones</h2>
      {error && <div className="error">{error}</div>}

      <div className="filters">
        <input
          type="text"
          placeholder={`Buscar por ${filterType === "id" ? "ID" : filterType}`}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <select value={filterType} onChange={handleSelectChange}>
          <option value="name">Nombre</option>
          <option value="generation">Generación</option>
          <option value="height">Altura</option>
          <option value="weight">Peso</option>
          <option value="type">Tipo</option>
        </select>
      </div>

      <div className="pokemon-cards">
        {pokemons.map((pokemon) => (
          <div className="pokemon-card" key={pokemon._id}>
            <h3>{pokemon.name}</h3>
            <p>
              <strong>Tipo:</strong> {pokemon.type}
            </p>
            <p>
              <strong>Peso:</strong> {pokemon.weight}
            </p>
            <p>
              <strong>Altura:</strong> {pokemon.height}
            </p>
            <p>
              <strong>Generación:</strong> {pokemon.generation.generation}
            </p>
            <p>
              <strong>Pre-Evolución:</strong>
              {pokemon.preEvolutions.length > 0
                ? pokemon.preEvolutions
                    .map((preEvolution) => preEvolution.name)
                    .join(", ")
                : "N/A"}
            </p>
            <p>
              <strong>Evolución:</strong>
              {pokemon.evolutions.length > 0
                ? pokemon.evolutions
                    .map((evolution) => evolution.name)
                    .join(", ")
                : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashPokemon;
