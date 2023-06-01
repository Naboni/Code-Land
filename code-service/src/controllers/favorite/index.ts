import { Favorite } from "@prisma/client";

import prismaClient from "../../prisma";

export async function getFavorites() {
  return await prismaClient.favorite.findMany({
    include: {
      questions: true,
    },
  });
}

export async function getFavorite(id: string) {
  return await prismaClient.favorite.findUnique({
    where: { id },
  });
}

export async function postFavorite(userId: string, questions: string[]) {
  return await prismaClient.favorite.create({
    data: {
      userId: userId,
      questions: {
        connect: questions.map((questionId) => ({ id: questionId })),
      },
    },
  });
}

export async function updateFavorite(
  id: string,
  userId: string,
  questions: string[]
) {
  return await prismaClient.favorite.update({
    where: { id },
    data: {
      userId: userId,
      questions: {
        connect: questions.map((questionId) => ({ id: questionId })),
      },
    },
  });
}
