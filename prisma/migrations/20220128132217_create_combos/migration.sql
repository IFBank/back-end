-- CreateTable
CREATE TABLE "combos" (
    "id" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "combos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combos_item" (
    "id" TEXT NOT NULL,
    "combos_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "combos_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "combos" ADD CONSTRAINT "combos_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combos_item" ADD CONSTRAINT "combos_item_combos_id_fkey" FOREIGN KEY ("combos_id") REFERENCES "combos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combos_item" ADD CONSTRAINT "combos_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
