-- CreateEnum
CREATE TYPE "RecordingBotStatus" AS ENUM ('JOINING', 'FAILED', 'RECORDING', 'RECORDED');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "recordingBotStatus" "RecordingBotStatus" NOT NULL DEFAULT 'JOINING';
