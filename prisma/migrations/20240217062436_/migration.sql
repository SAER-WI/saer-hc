/*
  Warnings:

  - You are about to drop the column `approved` on the `Userhc` table. All the data in the column will be lost.
  - You are about to drop the column `blocked` on the `Userhc` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Userhc" DROP COLUMN "approved",
DROP COLUMN "blocked";
