import { quotes } from "@prisma/client";

export type CreateQuotes = Omit<quotes, "id" | "fecha" | "fk_business" | "fk_user">;

export type UpdateQuotes = Partial<CreateQuotes>;
