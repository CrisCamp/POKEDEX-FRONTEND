import React, { useState, useEffect } from "react";
import "./PokemonInfo.css";

interface Pokemon {
  _id: string;
  name: string;
  type: string;
  weight: string;
  height: string;
  generation: {
    _id: string;
    generation: number;
  };
  evolutions: { name: string }[];
  preEvolutions: { name: string }[];
}

const PokemonInfo = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        const response = await fetch("http://localhost:3000/api/v1/pokemons", {
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

  return (
    <div className="pokedex-info">
      <h2>Lista de Pokémones</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Peso</th>
            <th>Altura</th>
            <th>Generación</th>
            <th>Pre-Evolución</th>
            <th>Evolución</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon._id}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonInfo;
