/*
  Warnings:

  - Changed the type of `embedding` on the `Transcript` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "embedding",
ADD COLUMN     "embedding" vector(768) NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "isTranscribed" BOOLEAN NOT NULL DEFAULT false;

-- Add the embedding column AFTER the extension exists
ALTER TABLE "Transcript"
  ADD COLUMN "embedding" vector(768) NOT NULL;
