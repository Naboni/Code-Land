/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Favorite_userId_key";

-- DropIndex
DROP INDEX "Solution_userId_idx";

-- DropTable
DROP TABLE "User";
