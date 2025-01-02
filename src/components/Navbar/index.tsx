import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <div>
          <Link href="/">
            <Image src="/images/logo.png" alt="THP Logo" width={64.5} height={37} />
          </Link>
        </div>
        <div>
          <Link href="/">Cotizaciones</Link>
          <Link href="/history">Historial</Link>
          <Link href="/settings">Configuración</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
