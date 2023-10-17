import React, { useEffect, useState } from 'react';
import styles from './preview.module.css';
import { useQuotes } from '@/context/QuotesContext';
import Image from 'next/image';
import { IExportQuote } from '@/interfaces/data/Quotes';

function Preview() {
  const { selectedQuote } = useQuotes();
  const [currentDocument, setCurrentDocument] = useState<IExportQuote>();

  useEffect(() => {
    if (selectedQuote?.json_document) {
      const doc = selectedQuote?.json_document as unknown as IExportQuote;
      setCurrentDocument(doc);
    }
  }, [selectedQuote])

  return (
    <div className={styles.preview}>
      <h1>Visualización de documento</h1>
      <div>
        <div className={styles.header}>
          <Image src="/images/logo.png" alt="THP" width={60} height={34} />
          <div>
            <h1>Servicio de Soldadura</h1>
            <h1>Taller de Herrería “EL PARIENTE”</h1>
          </div>
          <Image src="/images/logo.png" alt="THP" width={60} height={34} />
        </div>
        <div className={styles.info}>
          <div>
            <span>Calle: Fco. Javier Mina #124</span>
            <span>Cuauhtémoc, Colima</span>
          </div>
          <div>
            <span>Colonia: Emiliano Zapata</span>
            <span>{`Fecha: ${currentDocument?.fecha}`}</span>
          </div>
          <div>
            <span>CEL: 312 111 11 76</span>
          </div>
        </div>
        <div className={styles.document}>
          <h2>{currentDocument?.titulo_trabajo}</h2>
          <div>
            <p>Nombre:</p>
            <span>{currentDocument?.nombre_cliente}</span>
          </div>
          {
            currentDocument?.domicilio_label === ''
            ? null
            : (
              <div>
                <p>{`${currentDocument?.domicilio_label}:`}</p>
                <span>{currentDocument?.domicilio_cliente}</span>
              </div>
            )
          }
          <div className={styles.caracteristicas}>
            <p>1. {currentDocument?.descripcion_trabajo}:</p>
            {
              currentDocument?.caracteristicas.split('\n').map((line) =>
                <p style={{ paddingLeft: '1.5rem'}}>{line}</p>
              )
            }
          </div>
          <div className={styles.bill}>
            {currentDocument?.anticipo_label === '' ? null : <p>{`${currentDocument?.anticipo_label}: ${currentDocument?.anticipo}`}</p>}
            <p>{`Total: $${currentDocument?.total}`}</p>
            <p>{`(${currentDocument?.numero_letras} ${currentDocument?.centavos}/100 M.N.)`}</p>
          </div>
          <div>
            <p>Firma: Jesús Mendoza Ochoa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
