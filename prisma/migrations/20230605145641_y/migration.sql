/*
  Warnings:

  - Added the required column `confirmed` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmed" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "RegistrationCode" (
    "email" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationCode_email_code_expires_at_key" ON "RegistrationCode"("email", "code", "expires_at");
