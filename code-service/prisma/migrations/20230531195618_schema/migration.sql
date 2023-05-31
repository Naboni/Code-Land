-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "birthday" TEXT,
    "gender" TEXT,
    "linkedin" TEXT,
    "github" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solution" (
    "id" TEXT NOT NULL,
    "solutionCode" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoriteToQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_key" ON "Favorite"("userId");

-- CreateIndex
CREATE INDEX "Solution_userId_idx" ON "Solution"("userId");

-- CreateIndex
CREATE INDEX "Solution_topicId_idx" ON "Solution"("topicId");

-- CreateIndex
CREATE INDEX "Solution_questionId_idx" ON "Solution"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToQuestion_AB_unique" ON "_FavoriteToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToQuestion_B_index" ON "_FavoriteToQuestion"("B");

-- CreateIndex
CREATE INDEX "Comment_discussionId_idx" ON "Comment"("discussionId");

-- CreateIndex
CREATE INDEX "Discussion_questionId_idx" ON "Discussion"("questionId");

-- CreateIndex
CREATE INDEX "Question_topicId_idx" ON "Question"("topicId");
