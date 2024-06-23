// src/types/types.ts

// Interface para mostrar a todos los pokemones y todos sus atributos ademas de poder editarlos
export interface Pokemons {
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

// Interface para mostrar a todos las evoluciones y todos sus atributos ademas de poder editarlos
export interface Evolutions {
  id: string; // el back lo regresa como id y no como _id
  basePokemonId: string;
  evolvesToPokemonId: string;
  level: number;
  condition: string;
}

export interface Generations {
  _id: string;
  generation: number;
}
