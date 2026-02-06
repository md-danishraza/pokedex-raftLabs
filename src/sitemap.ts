import { MetadataRoute } from "next";
import { getPokemonList } from "@/lib/pokeapi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define your base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // 2. Fetch Data for Dynamic Routes
  // We fetch the first 151 Pokemon to generate their specific URLs
  const pokemonData = await getPokemonList(151);

  // We also need the types (Fire, Water, etc.)
  // Since we didn't make a specific API function for "all types" list,
  // we can manually list the main ones or fetch them.
  // For safety/speed, let's just map the most common ones here:
  const types = [
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "steel",
    "fairy",
  ];

  // 3. Generate Pokemon URLs
  const pokemonUrls = pokemonData.results.map((p) => ({
    url: `${baseUrl}/pokemon/${p.name}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 4. Generate Type URLs
  const typeUrls = types.map((type) => ({
    url: `${baseUrl}/type/${type}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 5. Return the combined sitemap
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...pokemonUrls,
    ...typeUrls,
  ];
}
