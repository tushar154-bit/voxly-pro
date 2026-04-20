-- AlterTable
ALTER TABLE "Report" ADD COLUMN "sections" TEXT[] DEFAULT ARRAY[]::TEXT[];
