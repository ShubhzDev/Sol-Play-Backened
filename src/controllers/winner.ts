import { Request, Response } from "express";
import Winner from "../models/Winner";
import Player from "../models/Player";
import Game from "../models/Game";
import { GameStatus } from "../models/types";

export const winner = async (req: Request, res: Response) => {
  const { player_id, game_id } = req.body;

  if (!player_id) {
    return res.status(400).send({ message: "player_id is missing!" });
  }

  if (!game_id) {
    return res.status(400).send({ message: "game_id is missing!" });
  }

  try {
    const player = await Player.findById(player_id);
    if (!player) {
      return res.status(404).send({ message: "Player not found!" });
    }

    const game = await Game.findById(game_id);
    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    const winner = await Winner.create({
      gameId: game_id,
      discordId: player.discordId,
      discordName: player.discordName,
      userName: player.userName,
      name: player.name
    });

    // Update game status
    game.gameStatus = GameStatus.FINISHED;
    game.winner = winner._id.toString();
    await game.save();

    res.status(200).send(winner);
  } catch (error) {
    console.error("Error updating winner:", error);
    res.status(500).send({ message: "Unable to update winner" });
  }
};

export default winner;