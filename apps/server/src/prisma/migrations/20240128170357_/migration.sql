/*
  Warnings:

  - Added the required column `order` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "order" INTEGER NOT NULL;
