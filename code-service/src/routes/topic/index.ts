import express, { Request, Response } from 'express';

import { getTopics } from '../../controllers/topic';

const router = express.Router();

router.get('/topics', async (req: Request, res: Response) => {
  const topics = await getTopics();

  res.json({ topics });
});

export { router as topicRouter };
