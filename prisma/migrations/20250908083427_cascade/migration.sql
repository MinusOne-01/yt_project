-- DropForeignKey
ALTER TABLE "public"."Link_meta" DROP CONSTRAINT "Link_meta_linkId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Link_meta" ADD CONSTRAINT "Link_meta_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
