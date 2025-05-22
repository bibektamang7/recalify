/*
  Warnings:

  - Made the column `segments` on table `Transcript` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transcript" ALTER COLUMN "segments" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Transcript_videoId_idx" ON "Transcript"("videoId");
