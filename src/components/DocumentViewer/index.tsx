import React from 'react';
import Viewer, { IDocument } from 'react-doc-viewer';

const DocumentViewer = () => {
  console.log(`http://localhost:3000/templates/Facturas THP.docx`);

  const docs: IDocument[] = [
    {
      uri: `http://127.0.0.1:3000/templates/Facturas THP.docx`,
    }, // Cambia esto por la ruta correcta
  ];

  return (
    <div>
      <Viewer documents={docs} />
    </div>
  );
};

export default DocumentViewer;
