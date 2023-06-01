import express, { Request, Response } from 'express';

import { getQuestion, getQuestions, postQuestion, updateQuestion } from '../../controllers/question';

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

router.post('/question', async (req: Request, res: Response) => {

  const question = await postQuestion(req.body);

  res.json({ question });
});

router.put('/question', async (req: Request, res: Response) => {

  const question = await updateQuestion(req.body);

  res.json({ question });
});

export { router as questionRouter };
