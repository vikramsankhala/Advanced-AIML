'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/topics', label: 'Topics', icon: '📚' },
  { href: '/library', label: 'Resource Library', icon: '📖' },
  { href: '/sandbox', label: 'Coding Sandbox', icon: '💻' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brand}>
        <span className={styles.brandIcon}>🧠</span>
        <span>Advanced AIML Companion</span>
      </Link>
      <div className={styles.navLinks}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
