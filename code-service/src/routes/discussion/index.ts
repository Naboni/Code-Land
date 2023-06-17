import express, { Request, Response } from 'express';

import { getDiscussions, getDiscussion, postDiscussion, updateDiscussion, deleteDiscussion } from '../../controllers/discussion';

const router = express.Router();

router.get('/discussions/:questionId', async (req: Request, res: Response) => {
  const { questionId } = req.params;

  const discussions = await getDiscussions(questionId);

  res.json({ discussions });
});

router.get('/discussion/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const discussion = await getDiscussion(id);

  res.json({ discussion });
});

router.post('/discussion', async (req: Request, res: Response) => {
  const { title, description, tag, user_id, questionId } = req.body;

  const discussion = await postDiscussion({
    title,
    description,
    tag,
    seen_count: 0,
    up_vote_count: 0,
    down_vote_count: 0,
    user_id,
    questionId,
  });

  res.status(201).json({ discussion });
});

router.put('/discussion', async (req: Request, res: Response) => {
  const { id, title, description, tag, user_id, questionId, seen_count, up_vote_count, down_vote_count } = req.body;

  const discussion = await updateDiscussion({
    id,
    title,
    description,
    tag,
    seen_count,
    up_vote_count,
    down_vote_count,
    user_id,
    questionId,
  });

  res.json({ discussion });
});


router.delete('/discussion/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteDiscussion(id);

  res.status(204).send();
});

export { router as discussionRouter };
