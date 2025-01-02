'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Form from '@/components/Form';
import styles from './page.module.css';

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
