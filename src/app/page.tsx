// src/app/page.tsx
import { getPokemonList } from "@/lib/pokeapi";

import PokemonCard from "@/components/ui/PokemonCard";
import { getIdFromUrl } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

export default async function Home() {
  // Fetch data on the server
  const data = await getPokemonList(48); 

  return (
    <main className="container py-12">
      <header className="mb-12 text-center">
     
          <Logo />
        
        <h5 className="text-md var(--font-heading) mx-auto">
          Explore the complete collection of Pokémon stats, evolutions, and abilities. <br />
          A programmatic SEO example built with Next.js.
        </h5>
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