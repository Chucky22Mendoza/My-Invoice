import React from 'react';
import Viewer, { IDocument } from 'react-doc-viewer';

function DocumentViewer() {
  const docs: IDocument[] = [
    {
      uri: 'http://127.0.0.1:3000/templates/Facturas THP.docx',
    }, // Cambia esto por la ruta correcta
  ];

  return (
    <div>
      <Viewer documents={docs} />
    </div>
  );
}

export default DocumentViewer;
