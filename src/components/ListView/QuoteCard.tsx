import React from 'react';
import { quotes } from '@prisma/client';
import { useQuotes } from '@/context/QuotesContext';
import { HiTrash, HiPencil, HiDocumentDownload} from 'react-icons/hi';
import styles from './listView.module.css';
import { loadFile } from '../Form';
import { IExportQuote } from '@/interfaces/data/Quotes';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from "file-saver";

type Props = {
  quote: quotes;
};

function QuoteCard({ quote }: Props) {
  const { deleteQuote, setSelectedQuote, selectedQuote, setIsPreview } = useQuotes();
  const currentDocument = quote.json_document as unknown as IExportQuote;

  const generateDocument = (data: IExportQuote) => {
    loadFile(
      '/templates/Facturas THP.docx',
      function (error, content) {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render(data);
        const blob = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); //Output the document using Data-URI
        saveAs(blob, data.nombre_cliente + '-' + data.fecha + '.docx');
      }
    );
  };

  return (
    <button type="button" key={quote.id} className={`${styles.card} ${selectedQuote?.id === quote.id ? styles.selected : ''}`} onClick={() => {
      setSelectedQuote(quote);
      setIsPreview(true);
    }}>
      <div>
        <h1>{quote.titulo_trabajo} - ${currentDocument.total}</h1>
        <div>
          <p>{quote.descripcion_trabajo} - {currentDocument.fecha}</p>
        </div>
      </div>
      <div>
        <button onClick={(e) => {
          e.stopPropagation();
          generateDocument(currentDocument);
        }}>
          <HiDocumentDownload />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedQuote(quote);
            setIsPreview(false);
          }}
        >
          <HiPencil />
        </button>
        <button
          onClick={async (e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this note?")) {
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
