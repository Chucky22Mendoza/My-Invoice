'use client';

import React from 'react';
import styles from './page.module.css';
import Navbar from '@/components/Navbar';
import Form from '@/components/Form';

function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <Form />
      </div>
    </main>
  );
}

export default Home;
