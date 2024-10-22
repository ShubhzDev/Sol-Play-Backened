-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('UNO');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('ACTIVE', 'FINISHED', 'PENDING');

-- CreateTable
CREATE TABLE "Game" (
    "gameId" SERIAL NOT NULL,
    "gameType" "GameType" NOT NULL,
    "gameStatus" "GameStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Game_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "Winner" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameHistory" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "gameHistoryId" INTEGER NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "cardName" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameToPlayer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Winner_gameId_key" ON "Winner"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Winner_discordId_key" ON "Winner"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_discordId_key" ON "Player"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "GameHistory_gameId_key" ON "GameHistory"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Move_cardId_key" ON "Move"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToPlayer_AB_unique" ON "_GameToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToPlayer_B_index" ON "_GameToPlayer"("B");

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHistory" ADD CONSTRAINT "GameHistory_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_gameHistoryId_fkey" FOREIGN KEY ("gameHistoryId") REFERENCES "GameHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPlayer" ADD CONSTRAINT "_GameToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("gameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPlayer" ADD CONSTRAINT "_GameToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
