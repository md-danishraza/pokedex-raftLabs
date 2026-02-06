import styles from "../../styles/StatBar.module.css"
import { capitalize } from '@/lib/utils'

interface StatBarProps {
  label: string
  value: number
  max?: number  // max out is 255
}

export default function StatBar({ label, value, max = 255 }: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={styles.row}>
      <div className={styles.label}>
        {capitalize(label.replace('-', ' '))}
      </div>

      <div className={styles.value}>{value}</div>

      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
