import express, { Request, Response } from 'express';

import { getQuestion, getQuestions } from '../../controllers/question';

const router = express.Router();

router.get('/questions', async (req: Request, res: Response) => {
  const questions = await getQuestions();

  res.json({ questions });
});

router.get('/question/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const question = await getQuestion(id);

  res.json({ question });
});

export { router as questionRouter };
