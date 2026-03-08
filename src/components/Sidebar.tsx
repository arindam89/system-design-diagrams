'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DiagramInfo } from '@/lib/diagrams'
import styles from './Sidebar.module.css'

interface SidebarProps {
  diagrams: DiagramInfo[]
}

export default function Sidebar({ diagrams }: SidebarProps) {
  const pathname = usePathname()
  
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Link href="/" className={styles.sidebarTitle}>
          System Design Diagrams
        </Link>
      </div>
      <ul className={styles.sidebarList}>
        {diagrams.map(({ slug, name }) => {
          const isActive = pathname === `/diagram/${slug}`
          return (
            <li key={slug}>
              <Link
                href={`/diagram/${slug}`}
                className={`${styles.sidebarItem}${isActive ? ` ${styles.active}` : ''}`}
              >
                {name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
