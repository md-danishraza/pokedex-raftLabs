'use client'

import styles from '@/styles/SearchBar.module.css'

type Props = {
  query: string
  setQuery: (value: string) => void
}

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Pokémon…"
      />
      <span className={styles.icon}>🔍</span>
    </div>
  )
}
