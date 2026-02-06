
import { getPokemonByType } from "@/lib/pokeapi";
import PokemonGrid from "@/components/ui/PokemonGrid";
import TypeBadge from "@/components/ui/TypeBadge";

import type { Metadata } from "next";
import { capitalize } from "@/lib/utils";
import BackLink from "@/components/ui/BackLink";

interface PageProps {
  params: { slug: string };
}

// Dynamic Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const typeName = capitalize((await params).slug);
  return {
    title: `Best ${typeName} Type Pokémon `,
    description: `Browse all ${typeName} type Pokémon including stats, evolutions, and strengths.`,
    openGraph: {
      title: `Top ${typeName} Type Pokémon`,
      description: `Find all ${typeName} Pokemon in one place.`,
      url: `/type/${(await params).slug}`,
      type: 'website',
      
    },
  };
}

// Server-Side (SEO): We fetch all Pokemon of that type (e.g., "Fire") on the server so Google sees them.
// Client-Side (UX): We add a real-time Search Bar to instantly filter that list (e.g., typing "Char" inside the Fire page).

export default async function TypePage({ params }: PageProps) {
  const typeName = (await params).slug;
  const pokemonList = await getPokemonByType(typeName);

  return (
    <main className="container py-12">
      <div className="text-center mb-2">
        {/* <Link href="/" className="inline-block mb-6 text-[var(--text-muted)] hover:text-[var(--brand)]">
          ← Back to All Types
        </Link> */}
        <BackLink href="/"  label="Back to All Types"/>
        
        <h1 className="text-xl sm:text-3xl md:text-5xl font-bold  mt-4 flex items-center justify-center gap-4">
          <TypeBadge type={typeName} />
          <span className="capitalize"> Pokémon Type</span>
        </h1>
        
        <p className="text-[var(--text-secondary)] mx-auto">
          Found {pokemonList.length} Pokémon of this elemental type.
        </p>
      </div>

      {/* Client Component for filtering */}
      <PokemonGrid pokemon={pokemonList} />
    </main>
  );
}