import express, { Request, Response } from 'express';

import { getTopics, postTopic, updateTopic } from '../../controllers/topic';

const router = express.Router();

router.get('/topics', async (req: Request, res: Response) => {
  const topics = await getTopics();

  res.json({ topics });
});

router.post('/topic', async (req: Request, res: Response) => {
  const { topic_name, topic_type } = req.body;

  const topic = await postTopic({
    topic_name,
    topic_type
  });

  res.json({ topic });
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

export { router as topicRouter };
