import { Discussion, PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function getDiscussions(id: string) {
  return await prismaClient.discussion.findMany({
    where: { questionId: id },
    include: {
      comment: true,
    },
  });
}

export async function getDiscussion(id: string) {
  return await prismaClient.discussion.findUnique({
    where: { id },
    include: {
      comment: true,
    },
  });
}

export async function postDiscussion(discussion: Omit<Discussion, 'id' | 'createdAt'>) {
  return await prismaClient.discussion.create({
    data: discussion,
  });
}

export async function updateDiscussion(discussion: Omit<Discussion, 'createdAt'>) {
  return await prismaClient.discussion.update({
    where: { id: discussion.id },
    data: discussion,
  });
}
