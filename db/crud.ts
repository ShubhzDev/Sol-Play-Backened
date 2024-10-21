import { Game, GameHistory, GameWinner, Moves, Player, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addPlayer(
  discordId: string,
  discordName: string,
  userName: string,
  name: string
) : Promise<Player> {
  const player = await prisma.player.create({
    data: {
      discordId: discordId,
      discordName: discordName,
      name: name,
      userName: userName,
    }
  });

  //add message if player already exist
  return player;
}

/*
When a player joins a game in discord:-
it sends :-it's discord_id,game id and type of game.
*/
export async function joinGame(id: number, discordId: string) : Promise<Game|null> {
  //check if player exists already in database
  const player = await prisma.player.findUnique({
    where: {
      discordId: discordId,
    },
  });

  if (!player) {
    return null;
  }

  const game = prisma.game.update({
    where: {
      gameId: id,
    },
    data: {
      players: {
        connect: { id: player.id },
      },
    },
  });

  return game;

  //add message if player is already a part of game
}

/*
When a player create a game in discord:-
it sends :-it's discord_id,and type of game.
*/
export async function createGame(discordId: string, gameType: string) : Promise<Game|null>{
  //check if player exists already in database
  const player = await prisma.player.findUnique({
    where: {
      discordId: discordId,
    },
  });

  if (!player) {
    return null;
  }

  const game = await prisma.game.create({
    data: {
      players: {
        connect: { id: player.id },
      },
      gameType: gameType,
    },
  });

  return game;
}

/*
When a player plays a move in discord:-
it sends :-it's game_id,card_id and move
*/
export async function updateGameHistory(
  gameId: number,
  cardId: number,
  move: Moves
) : Promise<GameHistory|null>{
  const card = await prisma.card.findUnique({
    where: {
      id: cardId,
    },
  });

  if (!card) {
    return null;
  }

  const game = await prisma.game.findUnique({
    where: {
      gameId: gameId,
    },
  });

  if (!game) {
    return null;
  }

  const gameHistory = await prisma.gameHistory.update({
    where: {
      gameId: gameId,
    },
    data: {
      moves: {
        connect: { id: move.id },
      },
    },
  });

  return gameHistory;

}

export async function updateWinner(playerId: number, gameId: number) : Promise<GameWinner | null> {
  const player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
    select: {
      discordName: true,
      discordId: true,
      userName: true,
      name: true,
    },
  });

  if (!player) {
    return null;
  }

  const winner = await prisma.gameWinner.update({
    where: {
      gameId: gameId,
    },
    data: {
      gameId: gameId,
      discordId: player.discordId,
      discordName: player.discordName,
      userName: player.userName,
      name: player.name,
    }
  });

  return winner;


}
