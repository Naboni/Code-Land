import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function getQuestions() {
  return await prismaClient.question.findMany({
    include: {
      topic: {
        select: {
          topic_type: true,
        },
      },
    },
  });
}

export async function getQuestion(id: string) {
  return await prismaClient.question.findUnique({
    where: { id },
  });
}
