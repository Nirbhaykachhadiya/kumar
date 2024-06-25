/*
  Warnings:

  - You are about to drop the column `paperId` on the `Que` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Que" DROP CONSTRAINT "Que_paperId_fkey";

-- AlterTable
ALTER TABLE "Que" DROP COLUMN "paperId";

-- CreateTable
CREATE TABLE "PaperQue" (
    "id" SERIAL NOT NULL,
    "paperId" INTEGER NOT NULL,
    "queId" INTEGER NOT NULL,

    CONSTRAINT "PaperQue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaperQue" ADD CONSTRAINT "PaperQue_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperQue" ADD CONSTRAINT "PaperQue_queId_fkey" FOREIGN KEY ("queId") REFERENCES "Que"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
