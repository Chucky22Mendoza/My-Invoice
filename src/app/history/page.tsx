'use client';

import React from 'react';
import styles from '../page.module.css';
import Navbar from '@/components/Navbar';
import ListView from '@/components/ListView';
import Preview from '@/components/Preview';
import UpdateForm from '@/components/Form/UpdateForm';
import { useQuotes } from '@/context/QuotesContext';

function History() {
  const { isPreview } = useQuotes();

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <ListView />
        {
          isPreview ? <Preview /> : <UpdateForm />
        }
      </div>
    </main>
  );
}

export default History;
