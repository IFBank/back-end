-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('DRINK', 'FOOD');

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "type" "ItemCategory" NOT NULL,
    "avatar_url" TEXT NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);
