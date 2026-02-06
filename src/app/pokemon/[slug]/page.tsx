import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPokemon } from "@/lib/pokeapi";
import { capitalize } from '@/lib/utils';
import TypeBadge from "@/components/ui/TypeBadge";
import StatBar from "@/components/ui/StatBar";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

// 1. Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const pokemon = await getPokemon((await params).slug);
    const name = capitalize(pokemon.name);
    
    return {
      title: `${name} Stats, Weaknesses & Evolution | MyPokedex`,
      description: `Detailed stats for ${name} (Pokemon #${pokemon.id}). Type: ${pokemon.types.map(t => t.type.name).join('/')}. Base HP: ${pokemon.stats[0].base_stat}.`,
      openGraph: {
        title: `${name} - Pokedex Entry`,
        images: [pokemon.sprites.other['official-artwork'].front_default],
      }
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
      <Link href="/" className="inline-block mb-8 text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors">
        ← Back to Pokedex
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Image & Basic Info */}
        <div className="card text-center relative md:sticky top-8 h-fit">
          <div className="relative aspect-square w-full mb-6 bg-slate-50 rounded-xl">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain p-8"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <span className="text-4xl font-bold text-gray-200 block -mt-4 mb-2">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <h1 className="text-4xl mb-6">{name}</h1>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm border-t border-[var(--border)] pt-6">
            <div>
              <p className="text-[var(--text-muted)]">Height</p>
              <p className="font-bold text-lg">{pokemon.height / 10} m</p>
            </div>
            <div>
              <p className="text-[var(--text-muted)]">Weight</p>
              <p className="font-bold text-lg">{pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>

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

          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Programmatic SEO Note</h3>
            <p className="text-blue-800 text-sm">
              This page was generated server-side. View the source code to see the 
              custom <strong>&lt;title&gt;</strong>, <strong>&lt;meta description&gt;</strong>, 
              and <strong>application/ld+json</strong> script automatically populated 
              with {name}'s specific data.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
