-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_boardId_fkey";

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
