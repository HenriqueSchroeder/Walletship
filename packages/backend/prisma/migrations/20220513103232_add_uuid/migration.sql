/*
  Warnings:

  - The primary key for the `tb_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_movement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tb_wallet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `tb_userId` on table `tb_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tb_walletId` on table `tb_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `walletId` on table `tb_movement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `tb_wallet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tb_categories` DROP FOREIGN KEY `tb_categories_tb_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tb_categories` DROP FOREIGN KEY `tb_categories_tb_walletId_fkey`;

-- DropForeignKey
ALTER TABLE `tb_movement` DROP FOREIGN KEY `tb_movement_walletId_fkey`;

-- DropForeignKey
ALTER TABLE `tb_wallet` DROP FOREIGN KEY `tb_wallet_userId_fkey`;

-- AlterTable
ALTER TABLE `tb_categories` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `tb_userId` VARCHAR(191) NOT NULL,
    MODIFY `tb_walletId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tb_movement` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `walletId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tb_user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tb_wallet` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tb_wallet` ADD CONSTRAINT `tb_wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_movement` ADD CONSTRAINT `tb_movement_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `tb_wallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_categories` ADD CONSTRAINT `tb_categories_tb_userId_fkey` FOREIGN KEY (`tb_userId`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_categories` ADD CONSTRAINT `tb_categories_tb_walletId_fkey` FOREIGN KEY (`tb_walletId`) REFERENCES `tb_wallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
