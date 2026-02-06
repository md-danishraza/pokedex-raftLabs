// src/app/page.tsx
import { getPokemonList } from "@/lib/pokeapi";

import PokemonCard from "@/components/ui/PokemonCard";
import { getIdFromUrl } from "@/lib/utils";

export default async function Home() {
  // Fetch data on the server
  const data = await getPokemonList(50); // Fetch top 50 for the demo

  return (
    <main className="container py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-4">Pokedex</h1>
        <p className="text-lg text-[var(--text-secondary)] mx-auto">
          Explore the complete collection of Pokémon stats, evolutions, and abilities. 
          A programmatic SEO example built with Next.js.
        </p>
      </header>

      {/* Grid Layout defined in your CSS */}
      <div className="grid grid-cards">
        {data.results.map((pokemon) => {
          const id = getIdFromUrl(pokemon.url);
          return (
            <PokemonCard 
              key={id} 
              name={pokemon.name} 
              id={id} 
            />
          );
        })}
      </div>
    </main>
  );
}