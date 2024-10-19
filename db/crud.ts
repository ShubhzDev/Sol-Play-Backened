import { Game, Moves, Player, PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export async function addPlayer(
  discordId: string,
  discordName: string,
  userName: string,
  playerName: string
) {
  await prisma.player.create({
    data: {
      discordId: discordId,
      discordName: discordName,
      playerName: playerName,
      userName: userName,
    },
    select: {
      discordId: true,
      discordName: true,
      playerName: true,
      userName: true,
    },
  });
}

/*
When a player joins a game in discord:-
it sends :-it's discord_id,game id and type of game.
*/
async function joinGame(id: number, discordId: string) {
  //check if player exists already in database
  const player = await prisma.player.findUnique({
    where: {
      id: id,
    },
  });

  if (!player) {
    return;
  }

  prisma.game.update({
    where: {
      gameId: id,
    },
    data: {
      players: {
        connect: { id: player.id },
      },
    },
  });
}

/*
When a player create a game in discord:-
it sends :-it's discord_id,and type of game.
*/
export async function createGame(discordId: string, gameType: string) {
  //check if player exists already in database
  const player = await prisma.player.findUnique({
    where: {
      discordId: discordId,
    },
  });

  if (!player) {
    return;
  }

  prisma.game.create({
    data: {
      players: {
        connect: { id: player.id },
      },
      gameType: gameType,
    },
  });
}

/*
When a player plays a move in discord:-
it sends :-it's game_id,card_id and move
*/
async function updateGameHistory(gameId: number, cardId: string,move : Moves) {
  const card = await prisma.card.findUnique({
    where:{
      id:cardId,
    }
  });

  if(!card){
    return;
  }

  const game = await prisma.game.findUnique({
    where:{
      gameId:gameId,
    }
  });

  if(!game){
    return;
  }

  await prisma.gameHistory.update({
    where:{
      gameId : gameId,
    },
    data:{
      moves:{
        connect : {id : move.id}
      }
    }
  });
}
