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

export async function getUserFavorite(userId: string) {
  return await prismaClient.favorite.findMany({
    where: { userId },
    include: {
      questions: true,
    },
  });
}

export async function isQuestionFavorited(userId: string, questionId: string) {
  const favorite = await prismaClient.favorite.findMany({
    where: { userId },
    include: {
      questions: true,
    },
  });

  for (const question of favorite[0].questions) {
    if (question.id === questionId) {
      return true;
    }
  }
  return false;
}

export async function postFavorite(userId: string, questionId: string) {
  const favorite = await prismaClient.favorite.findFirst({
    where: { userId },
    include: {
      questions: true,
    },
  });
  
  if (favorite?.id) {
    return await prismaClient.favorite.update({
      where: { id: favorite.id },
      data: {
        questions: {
          connect: [{ id: questionId }],
        },
      },
    });
  }
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

export async function deleteFavorite(userId: string, questionId: string) {

  const favorite = await prismaClient.favorite.findMany({
    where: { userId },
    include: {
      questions: true,
    },
  });

  const favoriteId = favorite[0].id;

  return await prismaClient.favorite.update({
    where: { id: favoriteId },
    data: {
      questions: {
        disconnect: [{ id: questionId }],
      },
    },
  });
}

