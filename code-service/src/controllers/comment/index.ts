import { Comment } from '@prisma/client';

import prismaClient from '../../prisma';

export async function postComment(comment: Omit<Comment, 'id' | 'createdAt'>) {
  return await prismaClient.comment.create({
    data: comment,
  });
}
