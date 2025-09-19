-- CreateTable
CREATE TABLE `Superhero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL,
    `real_name` VARCHAR(191) NOT NULL,
    `origin_description` VARCHAR(191) NOT NULL,
    `superpowers` VARCHAR(191) NOT NULL,
    `catch_phrase` VARCHAR(191) NULL,

    UNIQUE INDEX `Superhero_nickname_key`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `superheroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_superheroId_fkey` FOREIGN KEY (`superheroId`) REFERENCES `Superhero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
