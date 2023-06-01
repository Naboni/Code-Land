import { Question } from "@prisma/client";
import prismaClient from "../../prisma";

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

export async function postQuestion(question: Omit<Question, 'id' | 'createdAt'>) {
  return await prismaClient.question.create({
    data: question,
  });
}

export async function updateQuestion(question: Omit<Question, 'createdAt'>) {
  return await prismaClient.question.update({
    where: { id: question.id },
    data: question,
  });
}
