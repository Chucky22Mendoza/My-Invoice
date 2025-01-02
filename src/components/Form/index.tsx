'use client';

import React, { useState } from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import InputText from './Input';
import Button from './Button';
import IQuote, { IExportQuote, defaultFormData } from '@/interfaces/data/Quotes';
import { formatDecimals } from '@/utils/currency';
import formatDate from '@/utils/date';
import { useQuotes } from '@/context/QuotesContext';
import styles from './form.module.css';

export function loadFile(url: string, callback: (error: Error, content: string) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

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
      caracteristicas: `* ${formData.caracteristicas.replaceAll(', ', '\n* ').replaceAll(',', '\n* ')}`,
      descripcion_trabajo: formData.descripcion_trabajo,
    };

    const dataQuote: IExportQuote = {
      ...data,
      domicilio_cliente: String(data.domicilio_cliente),
      anticipo_label: data?.anticipo === 0 ? '' : 'Anticipo: ',
      domicilio_label: data?.domicilio_cliente === '' ? '' : 'Domicilio: ',
      anticipo: data?.anticipo === 0 ? '' : `$${formatDecimals(Number(data.anticipo))}`,
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
        ...dataQuote,
      },
    });

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
              value: formData.titulo_trabajo,
            }}
            onChange={(response) => {
              setFormData({
                ...formData,
                titulo_trabajo: response,
              });
            }}
          />

          <InputText
            propsInput={{
              id: 'nombreClienteInput',
              placeholder: 'Nombre del cliente',
              label: 'Nombre del cliente',
              type: 'text',
              value: formData.nombre_cliente,
            }}
            onChange={(response) => {
              setFormData({
                ...formData,
                nombre_cliente: response,
              });
            }}
          />

          <InputText
            propsInput={{
              id: 'domicilioClienteInput',
              placeholder: 'Domicilio del cliente (opcional)',
              label: 'Domicilio del cliente (opcional)',
              type: 'text',
              value: formData.domicilio_cliente,
            }}
            onChange={(response) => {
              setFormData({
                ...formData,
                domicilio_cliente: response,
              });
            }}
          />
        </div>

        <div>
          <InputText
            propsInput={{
              id: 'descripcionInput',
              placeholder: 'Descripción del trabajo: Elaboración de una bodega térmica',
              label: 'Descripción',
              type: 'text',
              value: formData.descripcion_trabajo,
            }}
            onChange={(response) => {
              setFormData({
                ...formData,
                descripcion_trabajo: response,
              });
            }}
          />

          <InputText
            propsInput={{
              id: 'caracteristicasInput',
              placeholder: 'Características del trabajo: PTR de 1/2, Placas de 30cm x 30cm x...',
              label: 'Características',
              type: 'text',
              value: formData.caracteristicas,
            }}
            onChange={(response) => {
              setFormData({
                ...formData,
                caracteristicas: response,
              });
            }}
          />
        </div>

        <div>
          <InputText
            propsInput={{
              id: 'totalInput',
              placeholder: 'Total',
              label: 'Total',
              type: 'number',
              value: String(formData.total),
            }}
            onChange={(response) => {
              setFormData({
                ...formData,
                total: Number(response),
              });
            }}
          />

          <InputText
            propsInput={{
              id: 'anticipoInput',
              placeholder: 'Anticipo (opcional)',
              label: 'Anticipo (opcional)',
              type: 'number',
              value: String(formData.anticipo),
            }}
            onChange={(response) => {
              setFormData({
                ...formData,
                anticipo: Number(response),
              });
            }}
          />
        </div>

        <div>
          <InputText
            propsInput={{
              id: 'totalLetraInput',
              placeholder: 'Total con letra',
              label: 'Total con letra',
              type: 'text',
              value: formData.numero_letras,
            }}
            onChange={(response) => {
              setFormData({
                ...formData,
                numero_letras: response,
              });
            }}
          />

          <InputText
            propsInput={{
              id: 'centavosInput',
              placeholder: 'Centavos',
              label: 'Centavos',
              type: 'number',
              value: String(formData.centavos),
            }}
            onChange={(response) => {
              setFormData({
                ...formData,
                centavos: Number(response),
              });
            }}
          />
        </div>
        <Button>Generar documento</Button>
      </form>
    </section>
  );
}

export default Form;
