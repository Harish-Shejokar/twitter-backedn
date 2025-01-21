-- DropForeignKey
ALTER TABLE `tweet` DROP FOREIGN KEY `Tweet_authorId_fkey`;

-- AddForeignKey
ALTER TABLE `tweet` ADD CONSTRAINT `tweet_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
