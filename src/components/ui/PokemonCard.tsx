
import Link from 'next/link';
import Image from 'next/image';
import { capitalize } from '@/lib/utils';


interface PokemonCardProps {
  name: string;
  id: string;
}

export default function PokemonCard({ name, id }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link href={`/pokemon/${name}`} className="card group block">
      <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={parseInt(id) <= 4} // Load first 4 images immediately
        />
      </div>
      
      <div className="text-center">
        <span className="text-sm font-bold text-gray-400">#{id.padStart(3, '0')}</span>
        <h2 className="text-xl font-bold mt-1 text-[var(--text-primary)]">
          {capitalize(name)}
        </h2>
      </div>
    </Link>
  );
}