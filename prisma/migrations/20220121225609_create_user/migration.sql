-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,
    "ifms_id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_ifms_id_key" ON "user"("ifms_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_ifms_id_fkey" FOREIGN KEY ("ifms_id") REFERENCES "ifms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
