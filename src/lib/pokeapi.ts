// # API Fetching Logic (The engine)

import { PokemonDetail, PokemonListResponse } from "@/types";

const API_URL = process.env.API_URL;

// 1. Fetch the list for the Homepage
export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`,
    {
      next: { revalidate: 86400 }, // Cache for 24 hours (ISR)
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  return res.json();
}

// 2. Fetch specific details for the SEO Pages
export async function getPokemon(slug: string): Promise<PokemonDetail> {
  const res = await fetch(`${API_URL}/pokemon/${slug}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`Failed to fetch Pokemon: ${slug}`);
  return res.json();
}

// 3. pokemon by type
export async function getPokemonByType(type: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`Failed to fetch type: ${type}`);

  const data = await res.json();

  // The structure is slightly different here, so we map it to match our PokemonListResult
  return data.pokemon.map((p: any) => ({
    name: p.pokemon.name,
    url: p.pokemon.url,
  }));
}
