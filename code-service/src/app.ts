import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import { errorHandler, NotFoundError, currentUser } from '@ymtick/common';

import { topicRouter } from './routes/topic';
import { commentRouter } from './routes/comment';
import { questionRouter } from './routes/question';
import { discussionRouter } from './routes/discussion';
import { solutionRouter } from './routes/solution';
import { favoriteRouter } from './routes/favorite';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

// app.use(currentUser);

app.use(topicRouter);
app.use(commentRouter);
app.use(questionRouter);
app.use(discussionRouter);
app.use(solutionRouter);
app.use(favoriteRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
