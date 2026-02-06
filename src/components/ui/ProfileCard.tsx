
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/ProfileCard.module.css"
import TypeBadge from './TypeBadge'
import { capitalize } from '@/lib/utils'

interface ProfileCardProps {
  id: number
  name: string
  image: string
  height: number
  weight: number
  types: {
    type: {
      name: string
    }
  }[]
}

export default function ProfileCard({
  id,
  name,
  image,
  height,
  weight,
  types,
}: ProfileCardProps) {
  return (
    <aside className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={`${capitalize(name)} official artwork`}
          fill
          priority
          className={styles.image}
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
      </div>

      <span className={styles.id}>
        #{String(id).padStart(3, '0')}
      </span>

      <h1 className={styles.name}>{capitalize(name)}</h1>

      <div className={styles.types}>
      {types.map((t) => (
          <Link
            key={t.type.name}
            href={`/type/${t.type.name}`}
            className={styles.typeLink}
          >
            <TypeBadge type={t.type.name} />
          </Link>
        ))}
      </div>

      <div className={styles.meta}>
        <div>
          <p className={styles.metaLabel}>Height</p>
          <p className={styles.metaValue}>{height / 10} m</p>
        </div>
        <div>
          <p className={styles.metaLabel}>Weight</p>
          <p className={styles.metaValue}>{weight / 10} kg</p>
        </div>
      </div>
    </aside>
  )
}
