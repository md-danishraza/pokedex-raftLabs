
'use client';

import { useState } from 'react';
import PokemonCard from './PokemonCard';
import { getIdFromUrl } from '@/lib/utils';
import { PokemonListResult } from '@/types';
import SearchBar from './SearchBar';

interface Props {
  pokemon: PokemonListResult[];
}

export default function PokemonGrid({ pokemon }: Props) {
  const [query, setQuery] = useState('');

  // Client-side filtering logic
  const filteredPokemon = pokemon.filter((p) => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <SearchBar query={query} setQuery={setQuery}/>

      {/* Results Count */}
      <p className="text-center text-[var(--text-muted)] mb-8 mx-auto">
        Showing {filteredPokemon.length} Pokémon
      </p>

      {/* The Grid */}
      {filteredPokemon.length > 0 ? (
        <div className="grid grid-cards">
          {filteredPokemon.map((p) => (
            <PokemonCard 
              key={p.name} 
              name={p.name} 
              id={getIdFromUrl(p.url)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">No Pokémon found matching "{query}"</p>
        </div>
      )}
    </div>
  );
}