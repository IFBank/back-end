-- CreateTable
CREATE TABLE "ifms" (
    "id" TEXT NOT NULL,
    "ra" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "born_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ifms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ifms_ra_key" ON "ifms"("ra");

-- CreateIndex
CREATE UNIQUE INDEX "ifms_cpf_key" ON "ifms"("cpf");
