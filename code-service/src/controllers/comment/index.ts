import { Comment, PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function postComment(comment: Omit<Comment, 'id' | 'createdAt'>) {
  return await prismaClient.comment.create({
    data: comment,
  });
}
