import express, { Request, Response } from "express";

import {
  deleteFavorite,
  getFavorite,
  getFavorites,
  getUserFavorite,
  isQuestionFavorited,
  postFavorite,
  updateFavorite,
} from "../../controllers/favorite";

const router = express.Router();

router.get("/favorites", async (req: Request, res: Response) => {
  const favorites = await getFavorites();

  res.json({ favorites });
});

router.get("/favorite/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const favorite = await getFavorite(id);

  res.json({ favorite });
});

router.get("/favorite/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  const favorite = await getUserFavorite(userId);

  res.json({ favorite });
});

router.get("/favorite/user/:userId/:questionId", async (req: Request, res: Response) => {
  const { userId, questionId } = req.params;

  const isFavorite = await isQuestionFavorited(userId, questionId);

  res.json({ isFavorite });
});

router.post("/favorite", async (req: Request, res: Response) => {
  const { userId, questionId } = req.body;

  const favorite = await postFavorite(userId, questionId);

  res.json({ favorite });
});

router.put("/favorite", async (req: Request, res: Response) => {
  const { id, user_id, questions } = req.body;

  const favorite = await updateFavorite(id, user_id, questions);

  res.json({ favorite });
});

router.delete("/favorite/:userId/:questionId", async (req: Request, res: Response) => {
  const { userId, questionId } = req.params;

  const favorite = await deleteFavorite(userId, questionId);

  res.json({ favorite });
});

export { router as favoriteRouter };
