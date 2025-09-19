-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_superheroId_fkey`;

-- DropIndex
DROP INDEX `Image_superheroId_fkey` ON `image`;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_superheroId_fkey` FOREIGN KEY (`superheroId`) REFERENCES `Superhero`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
