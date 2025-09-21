/*
  Warnings:

  - You are about to drop the column `groupId` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Link" DROP CONSTRAINT "Link_groupId_fkey";

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "groupId";

-- CreateTable
CREATE TABLE "public"."_LinkGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LinkGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LinkGroups_B_index" ON "public"."_LinkGroups"("B");

-- AddForeignKey
ALTER TABLE "public"."_LinkGroups" ADD CONSTRAINT "_LinkGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_LinkGroups" ADD CONSTRAINT "_LinkGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
