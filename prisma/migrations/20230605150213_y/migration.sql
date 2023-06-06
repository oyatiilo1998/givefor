-- AlterTable
ALTER TABLE "RegistrationCode" ALTER COLUMN "expires_at" SET DEFAULT NOW() + interval '1 minute';
