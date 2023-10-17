import { NextResponse } from "next/server";
import { IQuoteRequest } from "@/interfaces/data/Quotes";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const quotes = await prisma.quotes.findMany({
      where: {
        fk_business: '997851e0-308c-11ee-bbf5-ae7c0f262578',
      },
    });

    return NextResponse.json({
      data: quotes,
      message: 'Consulted successfully',
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const {
      titulo_trabajo,
      nombre_cliente,
      domicilio_cliente,
      descripcion_trabajo,
      caracteristicas,
      anticipo,
      total,
      numero_letras,
      centavos,
      json_document,
    }: IQuoteRequest = await request.json();

    const newNote = await prisma.quotes.create({
      data: {
        titulo_trabajo,
        nombre_cliente,
        domicilio_cliente,
        descripcion_trabajo,
        caracteristicas,
        anticipo,
        total,
        numero_letras,
        centavos,
        json_document,
        fk_business: '997851e0-308c-11ee-bbf5-ae7c0f262578',
        fk_user: 'a908ac86-308c-11ee-bbf5-ae7c0f262578',
      },
    });

    return NextResponse.json({
      data: newNote,
      message: 'Consulted successfully',
    }, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
