import express, { Request, Response } from 'express';

import { postComment } from '../../controllers/comment';

const router = express.Router();

router.post('/comment', async (req: Request, res: Response) => {
  const { text, user_id, user_name, user_profile, discussionId } = req.body;

  const comment = await postComment({
    text,
    user_id,
    user_name,
    user_profile,
    discussionId,
  }).catch(console.log);

  res.json({ comment });
});

export { router as commentRouter };
