'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import DocumentViewer from '@/components/DocumentViewer';
import styles from '../page.module.css';

function Settings() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <DocumentViewer />
      </div>
    </main>
  );
}

export default Settings;
