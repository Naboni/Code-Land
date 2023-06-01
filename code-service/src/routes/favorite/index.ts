import express, { Request, Response } from "express";

import {
  getFavorite,
  getFavorites,
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

router.post("/favorite", async (req: Request, res: Response) => {
  const { user_id, questions } = req.body;

  const favorite = await postFavorite(user_id, questions);

  res.json({ favorite });
});

router.put("/favorite", async (req: Request, res: Response) => {
  const { id, user_id, questions } = req.body;

  const favorite = await updateFavorite(id, user_id, questions);

  res.json({ favorite });
});

export { router as favoriteRouter };
