-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "Board_order_seq";
