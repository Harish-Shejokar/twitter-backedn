/*
  Warnings:

  - You are about to drop the `tweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tweet` DROP FOREIGN KEY `tweet_authorId_fkey`;

-- DropTable
DROP TABLE `tweet`;
