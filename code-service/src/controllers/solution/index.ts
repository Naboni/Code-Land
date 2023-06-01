import { Solution } from "@prisma/client";

import prismaClient from "../../prisma";
import e from "cors";

export async function getSolutions() {
  return await prismaClient.solution.findMany({
    include: {
      question: {
        select: {
          sample_input: true,
          sample_output: true,
        },
      },
    },
  });
}

export async function getSolution(id: string) {
  return await prismaClient.solution.findUnique({
    where: { id },
  });
}

export async function getUserSolutionForQuestion(
  userId: string,
  questionId: string
) {
  return await prismaClient.solution.findMany({
    where: { userId, questionId },
  });
}

export async function postSolution(
  solution: Omit<Solution, "id" | "createdAt">
) {
  try {
    return await prismaClient.solution.create({
      data: solution,
    });
  } catch (error) {
    console.log("e",error)
  }
}

export async function updateSolution(solution: Pick<Solution, "id" | "solutionCode">) {
  return await prismaClient.solution.update({
    where: { id: solution.id },
    data: solution,
  });
}
