/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_name_key" ON "order"("name");
