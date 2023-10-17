'use client';

import React, { useState } from 'react';
import InputText from './Input';
import Button from './Button';
import styles from './form.module.css';
import IQuote, { IExportQuote, defaultFormData } from '@/interfaces/data/Quotes';
import { formatDecimals } from '@/utils/currency';
import formatDate from '@/utils/date';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { useQuotes } from '@/context/QuotesContext';

function Form() {
  const [formData, setFormData] = useState(defaultFormData);
  const { createQuote } = useQuotes();

  const setRedBorder = (id: string) => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.style.borderColor = '#f40000';
    setTimeout(() => {
      inputElement.style.borderColor = '';
    }, 1500);
  };

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (formData.titulo_trabajo === '') {
      setRedBorder('tituloTrabajoInput');
      return;
    }

    if (formData.nombre_cliente === '') {
      setRedBorder('nombreClienteInput');
      return;
    }

    if (formData.descripcion_trabajo === '') {
      setRedBorder('descripcionInput');
      return;
    }

    if (formData.caracteristicas === '') {
      setRedBorder('caracteristicasInput');
      return;
    }

    if (formData.total === 0) {
      setRedBorder('totalInput');
      return;
    }

    if (formData.numero_letras === '') {
      setRedBorder('totalLetraInput');
      return;
    }

    const currentDate = new Date();
    const dateMonthName = formatDate(currentDate);

    const data: IQuote = {
      ...formData,
      fecha: dateMonthName,
      caracteristicas: '* ' + formData.caracteristicas.replaceAll(', ', '\n* ').replaceAll(',', '\n* '),
      descripcion_trabajo: formData.descripcion_trabajo,
    };

    const dataQuote: IExportQuote = {
      ...data,
      domicilio_cliente: String(data.domicilio_cliente),
      anticipo_label: data?.anticipo === 0 ? '' : 'Anticipo: ',
      domicilio_label: data?.domicilio_cliente === '' ? '' : 'Domicilio: ',
      anticipo: data?.anticipo === 0 ? '' : '$' + formatDecimals(Number(data.anticipo)),
      centavos: String(data.centavos),
      total: formatDecimals(data.total),
    };

    await createQuote({
      titulo_trabajo: data.titulo_trabajo,
      nombre_cliente: data.nombre_cliente,
      domicilio_cliente: String(data.domicilio_cliente),
      descripcion_trabajo: data.descripcion_trabajo,
      caracteristicas: data.caracteristicas,
      anticipo: Number(data.anticipo),
      total: data.total,
      numero_letras: data.numero_letras,
      centavos: data.centavos,
      json_document: {
        ...dataQuote
      },
    })

    generateDocument(dataQuote);
  };

  return (
    <section className={styles.content}>
      <div className={styles.title}>
        <h1>Taller de Herrería “EL PARIENTE” - Cotizaciones</h1>
      </div>
      <form className={styles.formu} onSubmit={onSubmit}>
        <div>
          <InputText
            propsInput={{
              id: 'tituloTrabajoInput',
              placeholder: 'Título del trabajo: Bodega térmica',
              label: 'Título del trabajo',
              type: 'text',
              onChange: (e) => {
                setFormData({
                  ...formData,
                  titulo_trabajo: e.target.value,
                });
              },
            }}
            value={formData.titulo_trabajo}
          />

          <InputText
            propsInput={{
              id: 'nombreClienteInput',
              placeholder: 'Nombre del cliente',
              label: 'Nombre del cliente',
              type: 'text',
              onChange: (e) => {
                setFormData({
                  ...formData,
                  nombre_cliente: e.target.value,
                });
              },
            }}
            value={formData.nombre_cliente}
          />

          <InputText
            propsInput={{
              id: 'domicilioClienteInput',
              placeholder: 'Domicilio del cliente (opcional)',
              label: 'Domicilio del cliente (opcional)',
              type: 'text',
              onChange: (e) => {
                setFormData({
                  ...formData,
                  domicilio_cliente: e.target.value,
                });
              },
            }}
            value={formData?.domicilio_cliente ?? ''}
          />
        </div>

        <div>
          <InputText
            propsInput={{
              id: 'descripcionInput',
              placeholder: 'Descripción del trabajo: Elaboración de una bodega térmica',
              label: 'Descripción',
              type: 'text',
              onChange: (e) => {
                setFormData({
                  ...formData,
                  descripcion_trabajo: e.target.value,
                });
              },
            }}
            value={formData.descripcion_trabajo}
          />

          <InputText
            propsInput={{
              id: 'caracteristicasInput',
              placeholder: 'Características del trabajo: PTR de 1/2, Placas de 30cm x 30cm x...',
              label: 'Características',
              type: 'text',
              onChange: (e) => {
                setFormData({
                  ...formData,
                  caracteristicas: e.target.value,
                });
              },
            }}
            value={formData.caracteristicas}
          />
        </div>

        <div>
          <InputText
            propsInput={{
              id: 'totalInput',
              placeholder: 'Total',
              label: 'Total',
              type: 'number',
              onChange: (e) => {
                setFormData({
                  ...formData,
                  total: Number(e.target.value),
                });
              },
            }}
            value={String(formData.total)}
          />

          <InputText
            propsInput={{
              id: 'anticipoInput',
              placeholder: 'Anticipo (opcional)',
              label: 'Anticipo (opcional)',
              type: 'number',
              onChange: (e) => {
                setFormData({
                  ...formData,
                  anticipo: Number(e.target.value),
                });
              },
            }}
            value={String(formData.anticipo)}
          />
        </div>

        <div>
          <InputText
            propsInput={{
              id: 'totalLetraInput',
              placeholder: 'Total con letra',
              label: 'Total con letra',
              type: 'text',
              onChange: (e) => {
                setFormData({
                  ...formData,
                  numero_letras: e.target.value,
                });
              },
            }}
            value={formData.numero_letras}
          />

          <InputText
            propsInput={{
              id: 'centavosInput',
              placeholder: 'Centavos',
              label: 'Centavos',
              type: 'number',
              onChange: (e) => {
                setFormData({
                  ...formData,
                  centavos: Number(e.target.value),
                });
              },
            }}
            value={String(formData.centavos)}
          />
        </div>
        <Button>Generar documento</Button>
      </form>
    </section>
  );
}

export function loadFile(url: string, callback: (error: Error, content: string) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

export default Form;
