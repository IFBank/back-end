-- CreateTable
CREATE TABLE "shop_item" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "shop_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shop_item_item_id_key" ON "shop_item"("item_id");

-- AddForeignKey
ALTER TABLE "shop_item" ADD CONSTRAINT "shop_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
