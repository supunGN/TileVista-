/*
  Warnings:

  - You are about to drop the column `osposItemId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `orderitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `packageproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `possynclog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `packageproduct` DROP FOREIGN KEY `PackageProduct_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `packageproduct` DROP FOREIGN KEY `PackageProduct_productId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `osposItemId`,
    DROP COLUMN `quantity`;

-- DropTable
DROP TABLE `orderitem`;

-- DropTable
DROP TABLE `packageproduct`;

-- DropTable
DROP TABLE `possynclog`;

-- DropTable
DROP TABLE `product`;

-- CreateTable
CREATE TABLE `item_asset_catalog` (
    `id` VARCHAR(191) NOT NULL,
    `ospos_item_id` INTEGER NOT NULL,
    `image_url` VARCHAR(500) NULL,
    `glb_url` VARCHAR(500) NULL,
    `scale_x` DOUBLE NOT NULL DEFAULT 1.0,
    `scale_y` DOUBLE NOT NULL DEFAULT 1.0,
    `scale_z` DOUBLE NOT NULL DEFAULT 1.0,
    `rotation_y` DOUBLE NOT NULL DEFAULT 0.0,
    `tags` VARCHAR(500) NULL,
    `material` VARCHAR(191) NULL,
    `finish` VARCHAR(191) NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `notes` VARCHAR(1000) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `item_asset_catalog_ospos_item_id_key`(`ospos_item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_item` (
    `packageId` VARCHAR(191) NOT NULL,
    `ospos_item_id` INTEGER NOT NULL,

    PRIMARY KEY (`packageId`, `ospos_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_item` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `ospos_item_id` INTEGER NOT NULL,
    `item_name` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price_at_purchase` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pos_sync_log` (
    `id` VARCHAR(191) NOT NULL,
    `ospos_item_id` INTEGER NOT NULL,
    `quantitySynced` DOUBLE NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `errorMessage` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `package_item` ADD CONSTRAINT `package_item_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `ProductPackage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
