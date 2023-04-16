import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function getTopics() {
  return await prismaClient.topic.findMany();
}
