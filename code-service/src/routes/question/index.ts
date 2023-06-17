import express, { Request, Response } from "express";

import {
  deleteQuestion,
  getQuestion,
  getQuestions,
  postQuestion,
  updateQuestion,
} from "../../controllers/question";

const router = express.Router();

router.get("/questions", async (req: Request, res: Response) => {
  const questions = await getQuestions();

  res.json({ questions });
});

router.get("/question/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const question = await getQuestion(id);

  res.json({ question });
});

router.post("/question", async (req: Request, res: Response) => {
  try {
    const question = await postQuestion(req.body);

    res.status(201).json({ question });
  } catch (error) {
    console.log("Error: ", error);
  }
});

router.put("/question", async (req: Request, res: Response) => {
  const question = await updateQuestion(req.body);

  res.json({ question });
});

router.delete("/question/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteQuestion(id);
  res.status(204).send();
});

export { router as questionRouter };
