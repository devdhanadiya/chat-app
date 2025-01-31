import { PrismaClient } from "@prisma/client";
import { NodeEnv } from "../config";

const globalPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalPrisma.prisma || new PrismaClient()
if (NodeEnv === "production") globalPrisma.prisma = prisma
