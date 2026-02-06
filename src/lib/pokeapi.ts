// # API Fetching Logic (The engine)

import { PokemonDetail, PokemonListResponse } from "@/types";

const BASE_URL = process.env.BASE_URL;

// 1. Fetch the list for the Homepage
export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    {
      next: { revalidate: 86400 }, // Cache for 24 hours (ISR)
    }
  );

  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  return res.json();
}

// 2. Fetch specific details for the SEO Pages
export async function getPokemon(slug: string): Promise<PokemonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${slug}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`Failed to fetch Pokemon: ${slug}`);
  return res.json();
}
