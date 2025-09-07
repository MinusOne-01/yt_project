-- CreateTable
CREATE TABLE "public"."Link_meta" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "name" TEXT,
    "logo" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_meta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_meta_linkId_key" ON "public"."Link_meta"("linkId");

-- AddForeignKey
ALTER TABLE "public"."Link_meta" ADD CONSTRAINT "Link_meta_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
