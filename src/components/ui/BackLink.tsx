
import Link from 'next/link'
import styles from '@/styles/BackLink.module.css' 

type BackLinkProps = {
  href?: string
  label?: string
}

export default function BackLink({
  href = '/',
  label = 'Back',
}: BackLinkProps) {
  return (
    <nav aria-label="Back navigation" className="mb-8">
      <Link href={href} className={styles.link}>
        <span>←</span>
        <span>{label}</span>
      </Link>
    </nav>
  )
}