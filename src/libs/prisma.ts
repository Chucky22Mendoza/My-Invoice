/* eslint vars-on-top: "off" */
import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined; // This must be a `var` and not a `let / const`
}

let prismaClient: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prismaClient = global.prisma;
}

const prisma = prismaClient;

export default prisma;
