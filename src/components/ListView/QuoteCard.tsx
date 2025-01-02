import React from 'react';
import { quotes } from '@prisma/client';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { HiTrash, HiPencil, HiDocumentDownload } from 'react-icons/hi';
import { saveAs } from 'file-saver';
import { useQuotes } from '@/context/QuotesContext';
import { loadFile } from '../Form';
import { IExportQuote } from '@/interfaces/data/Quotes';
import styles from './listView.module.css';

type Props = {
  quote: quotes;
};

function QuoteCard({ quote }: Props) {
  const {
    deleteQuote,
    setSelectedQuote,
    selectedQuote,
    setIsPreview,
  } = useQuotes();
  const currentDocument = quote.json_document as unknown as IExportQuote;

  const generateDocument = (data: IExportQuote) => {
    loadFile('/templates/Facturas THP.docx', (error, content) => {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.render(data);
      const blob = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(blob, `${data.nombre_cliente}-${data.fecha}.docx`);
    });
  };

  return (
    <button
      key={quote.id}
      type="button"
      className={`${styles.card} ${selectedQuote?.id === quote.id ? styles.selected : ''}`}
      onClick={() => {
        setSelectedQuote(quote);
        setIsPreview(true);
      }}
    >
      <div>
        <h1>{`${quote.titulo_trabajo} - ${currentDocument.total}`}</h1>
        <div>
          <p>{`${quote.descripcion_trabajo} - ${currentDocument.fecha}`}</p>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            generateDocument(currentDocument);
          }}
        >
          <HiDocumentDownload />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedQuote(quote);
            setIsPreview(false);
          }}
        >
          <HiPencil />
        </button>
        <button
          type="button"
          onClick={async (e) => {
            e.stopPropagation();
            // eslint-disable-next-line no-restricted-globals
            if (confirm('Are you sure you want to delete this note?')) {
              await deleteQuote(quote.id);
            }
          }}
        >
          <HiTrash />
        </button>
      </div>
    </button>
  );
}

export default QuoteCard;
