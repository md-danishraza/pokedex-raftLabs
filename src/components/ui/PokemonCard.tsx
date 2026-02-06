import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/PokemonCard.module.css'
import { capitalize } from '@/lib/utils'

interface PokemonCardProps {
  name: string
  id: string
}

export default function PokemonCard({ name, id }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Link href={`/pokemon/${name}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={`${capitalize(name)} official artwork`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
          priority={Number(id) <= 4}
        />
      </div>

      <div className={styles.meta}>
        <span className={styles.id}>#{id.padStart(3, '0')}</span>
        <h2 className={styles.name}>{capitalize(name)}</h2>
      </div>
    </Link>
  )
}
