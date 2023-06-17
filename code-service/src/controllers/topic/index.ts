import { Topic } from "@prisma/client";

import prismaClient from "../../prisma";

export async function getTopics() {
  return await prismaClient.topic.findMany({
    include: {
      question: true,
      solutions: true
    }
  });
}

export async function getTopicByUserSolution(userId: string) {
  return await prismaClient.topic.findMany({
    include: {
      question: true,
      solutions: {
        where: {
          userId,
        },
      }
    }
  });
}

export async function postTopic(topic: Omit<Topic, 'id' | 'createdAt'>) {
  return await prismaClient.topic.create({
    data: topic,
  });
}

export async function updateTopic(topic: Omit<Topic, 'createdAt'>) {
  return await prismaClient.topic.update({
    where: { id: topic.id },
    data: topic,
  });
}

export async function deleteTopic(id: string) {
  return await prismaClient.topic.delete({
    where: { id },
  });
}