-- AlterTable
ALTER TABLE `tb_user` ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `tb_movement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `content` VARCHAR(191) NULL,
    `value` DOUBLE NOT NULL,
    `walletId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `content` VARCHAR(191) NULL,
    `tb_userId` INTEGER NULL,
    `tb_walletId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_movement` ADD CONSTRAINT `tb_movement_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `tb_wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_categories` ADD CONSTRAINT `tb_categories_tb_userId_fkey` FOREIGN KEY (`tb_userId`) REFERENCES `tb_user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_categories` ADD CONSTRAINT `tb_categories_tb_walletId_fkey` FOREIGN KEY (`tb_walletId`) REFERENCES `tb_wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
