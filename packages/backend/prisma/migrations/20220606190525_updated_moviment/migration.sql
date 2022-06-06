/*
  Warnings:

  - You are about to drop the `movement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_walletId_fkey";

-- DropTable
DROP TABLE "movement";

-- CreateTable
CREATE TABLE "moviment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dateMoviment" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "walletId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "moviment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "moviment_id_key" ON "moviment"("id");

-- AddForeignKey
ALTER TABLE "moviment" ADD CONSTRAINT "moviment_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moviment" ADD CONSTRAINT "moviment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
