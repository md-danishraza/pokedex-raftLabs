
import { notFound } from 'next/navigation';
import { getPokemon } from "@/lib/pokeapi";
import { capitalize } from '@/lib/utils';

import StatBar from "@/components/ui/StatBar";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from 'next';
import BackLink from '@/components/ui/BackLink';
import ProfileCard from '@/components/ui/ProfileCard';

interface PageProps {
  params: { slug: string };
}

// 1. Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const pokemon = await getPokemon((await params).slug);
    const image = pokemon.sprites.other['official-artwork'].front_default;
    const name = capitalize(pokemon.name);
    const stats = pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ');
    
    return {
      title: `${name} Stats, Weaknesses & Evolution`,
      description: `Detailed Pokedex entry for ${name}. Base Stats: ${stats}. Type: ${pokemon.types.map(t => t.type.name).join('/')}.`,
      openGraph: {
        title: `${name} - Pokedex Stats`,
        description: `Check out the HP, Attack, and Defense stats for ${name}.`,
        url: `/pokemon/${(await params).slug}`,
        images: [
          {
            url: image, // dynamic Pokemon image.
            width: 800,
            height: 800,
            alt: `${name} official artwork`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${name} Stats`,
        description: `Base Stats: ${stats}`,
        images: [image],
      },
    };
  } catch (error) {
    return { title: 'Pokemon Not Found' };
  }
}

// 2. The Main Page Component
export default async function PokemonPage({ params }: PageProps) {
  let pokemon;
  
  try {
    pokemon = await getPokemon((await params).slug);
  } catch (error) {
    notFound(); // Redirects to 404 if slug is bad
  }

  const name = capitalize(pokemon.name);
  const image = pokemon.sprites.other['official-artwork'].front_default;

  // 3. Construct Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product", // 'Product' allows us to use 'name' and 'image' easily for Rich Snippets
    "name": name,
    "image": image,
    "description": `Pokedex entry for ${name}.`,
    "sku": `${pokemon.id}`,
    "brand": {
      "@type": "Brand",
      "name": "Pokemon"
    }
  };

  return (
    <main className="container py-12">
      <JsonLd data={jsonLd} />
      
      {/* Breadcrumb Navigation */}
      <BackLink href="/"  label="Back to Pokedex"/>

      <div className="grid md:grid-cols-2 gap-12 items-start mt-2">
        {/* left column: profile card */}
        <ProfileCard id={pokemon.id} name={name} image={image} height={pokemon.height} weight={pokemon.weight} types={pokemon.types}/>

        {/* Right Column: Stats & Data */}
        <div className="space-y-8 mt-8 md:mt-0">
          <div className="bg-white p-8 rounded-2xl border border-[var(--border)] shadow-sm">
            <h2 className="text-2xl mb-6 flex items-center gap-3">
              Base Stats
            </h2>
            <div className="space-y-2">
              {pokemon.stats.map((stat) => (
                <StatBar 
                  key={stat.stat.name}
                  label={stat.stat.name}
                  value={stat.base_stat}
                />
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </main>
  );
}
