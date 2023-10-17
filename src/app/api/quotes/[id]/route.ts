import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const quote = await prisma.quotes.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!quote) return NextResponse.json({ message: "Quote not found" }, { status: 404 });

    return NextResponse.json(quote);
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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedQuote = await prisma.quotes.delete({
      where: {
        id: params.id,
      },
    });
    if (!deletedQuote) return NextResponse.json({ message: "Note not found" }, { status: 404 });

    return NextResponse.json(deletedQuote);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Quote not found",
          },
          {
            status: 404,
          }
        );
      }

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

export async function PUT(request: Request, { params }: Params) {
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
    } = await request.json();

    const updatedQuote = await prisma.quotes.update({
      where: {
        id: params.id,
      },
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

    return NextResponse.json(updatedQuote);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Quote not found",
          },
          {
            status: 404,
          }
        );
      }

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