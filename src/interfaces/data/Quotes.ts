export default interface IQuote {
  id?: string;
  fecha: string;
  titulo_trabajo: string;
  nombre_cliente: string;
  domicilio_cliente?: string;
  descripcion_trabajo: string,
  caracteristicas: string;
  anticipo?: number;
  total: number;
  numero_letras: string;
  centavos: number;
}

export interface IQuoteRequest {
  fecha?: string;
  titulo_trabajo: string;
  nombre_cliente: string;
  domicilio_cliente?: string;
  descripcion_trabajo: string,
  caracteristicas: string;
  anticipo?: number;
  total: number;
  numero_letras: string;
  centavos: number;
  json_document: object;
}

export interface IQuoteDB extends IQuote {
  json_document?: object;
  fk_business?: string;
  fk_user?: string;
}

export interface IExportQuote {
  fecha: string;
  titulo_trabajo: string;
  nombre_cliente: string;
  descripcion_trabajo: string;
  domicilio_cliente: string;
  domicilio_label: string;
  caracteristicas: string;
  anticipo: string;
  anticipo_label: string;
  total: string;
  numero_letras: string;
  centavos: string;
}

export type IQuoteCreate = Omit<IQuote, 'id' | 'fecha'>;
export type IQuoteUpdate = Omit<IQuote, 'id' | 'fecha'>;

export const defaultFormData: IQuoteCreate = {
  titulo_trabajo: '',
  nombre_cliente: '',
  domicilio_cliente: '',
  descripcion_trabajo: '',
  caracteristicas: '',
  anticipo: 0,
  total: 0,
  numero_letras: '',
  centavos: 0,
};
