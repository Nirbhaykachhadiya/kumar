/*
  Warnings:

  - Added the required column `chepter` to the `Que` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Que" ADD COLUMN     "chepter" TEXT NOT NULL;
