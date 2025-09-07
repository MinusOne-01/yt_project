/*
  Warnings:

  - You are about to drop the column `url` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[channelId,userId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Link_url_userId_key";

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "url",
ADD COLUMN     "channelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_channelId_userId_key" ON "public"."Link"("channelId", "userId");
