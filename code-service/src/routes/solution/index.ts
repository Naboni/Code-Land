import express, { Request, Response } from 'express';

import { getSolution, getSolutions, getUserSolution, getUserSolutionForQuestion, postSolution, updateSolution } from '../../controllers/solution';

const router = express.Router();

router.get('/solutions', async (req: Request, res: Response) => {
  const solutions = await getSolutions();

  res.json({ solutions });
});

router.get('/solution/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const solution = await getSolution(id);

  res.json({ solution });
});

router.get("/solution/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  const solution = await getUserSolution(userId).catch(console.log);
  res.json({ solution });
});

router.get('/solution/:userId/:questionId', async (req: Request, res: Response) => {
  const { userId, questionId } = req.params;

  const solution = await getUserSolutionForQuestion(userId, questionId);

  res.json({ solution });
});

router.post('/solution', async (req: Request, res: Response) => {
    const { solutionCode, questionId, userId, topicId, official } = req.body;
  
    const solution = await postSolution({
      isDone: true,
      solutionCode,
      questionId,
      userId,
      topicId,
      official
    });
  
    res.json({ solution });
  });
  
  router.put('/solution', async (req: Request, res: Response) => {
    const { id, solutionCode } = req.body;
  
    const solution = await updateSolution({
      id,
      solutionCode,
    });
  
    res.json({ solution });
  });

export { router as solutionRouter };
