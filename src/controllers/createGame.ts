import { Request, Response } from "express";
import Game from "../models/Game";
import Player from "../models/Player";
import { GameType } from "../models/types";

export const gameCreation = async (req: Request, res: Response) => {
  const { discord_id, game_type } = req.body;

  if (!discord_id) {
    return res.status(400).send({ message: "discord_id parameter is missing!" });
  }

  if (!game_type) {
    return res.status(400).send({ message: "game_type parameter is missing!" });
  }

  try {
    const player = await Player.findOne({ discordId: discord_id });
    
    if (!player) {
      return res.status(404).send({ message: "Player not found!" });
    }

    // Check if player is already in an active game
    const activeGame = await Game.findOne({
      players: player._id,
      gameStatus: "ACTIVE"
    });

    if (activeGame) {
      return res.status(400).send({ message: "Player is already in an active game!" });
    }

    const game = await Game.create({
      players: [player._id],
      gameType: game_type as GameType
    });

    // Update player's games array
    await Player.findByIdAndUpdate(
      player._id,
      { $push: { games: game._id } }
    );

    res.status(200).send(game);
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).send({ message: "Unable to create Game!" });
  }
};

export default gameCreation;