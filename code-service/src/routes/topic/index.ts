import express, { Request, Response } from 'express';

import { deleteTopic, getTopicByUserSolution, getTopics, postTopic, updateTopic } from '../../controllers/topic';

const router = express.Router();

router.get('/topics', async (req: Request, res: Response) => {
  const topics = await getTopics();

  res.json({ topics });
});

router.get('/topics/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  const topics = await getTopicByUserSolution(userId);

  res.json({ topics });
});

router.post('/topic', async (req: Request, res: Response) => {
  const { topic_name, topic_type } = req.body;

  const topic = await postTopic({
    topic_name,
    topic_type
  });

  res.status(201).json({ topic });
});

router.put('/topic', async (req: Request, res: Response) => {
  const { id, topic_name, topic_type } = req.body;

  const topic = await updateTopic({
    id,
    topic_name,
    topic_type
  });

  res.json({ topic });
});

router.delete('/topic/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteTopic(id);

  res.status(204).send();
});

export { router as topicRouter };
