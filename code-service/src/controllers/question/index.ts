import { Question } from "@prisma/client";
import prismaClient from "../../prisma";

export async function getQuestions() {
  return await prismaClient.question.findMany({
    include: {
      discussion: true,
      solutions: true,
      topic: true,
      favorites: true,
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

export async function deleteQuestion(id: string) {
  console.log({id})
  return await prismaClient.question.delete({
    where: { id },
  });
}