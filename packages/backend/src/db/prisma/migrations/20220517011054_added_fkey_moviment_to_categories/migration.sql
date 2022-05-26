/*
  Warnings:

  - Added the required column `categoriesId` to the `movement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_walletId_fkey`;

-- AlterTable
ALTER TABLE `categories` MODIFY `walletId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `movement` ADD COLUMN `categoriesId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `movement_categoriesId_fkey` ON `movement`(`categoriesId`);

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movement` ADD CONSTRAINT `movement_categoriesId_fkey` FOREIGN KEY (`categoriesId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
