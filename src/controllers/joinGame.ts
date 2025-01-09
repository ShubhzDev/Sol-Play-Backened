import { Request, Response } from "express";
import Game from "../models/Game";
import Player from "../models/Player";

export const gameJoin = async (req: Request, res: Response) => {
  const { game_id, discord_id } = req.body;

  if (!game_id) {
    return res.status(400).send({ message: "game_id is missing!" });
  }

  if (!discord_id) {
    return res.status(400).send({ message: "discord_id is missing!" });
  }

  try {
    const player = await Player.findOne({ discordId: discord_id });
    if (!player) {
      return res.status(404).send({ message: "Player not found!" });
    }

    const game = await Game.findById(game_id);
    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    if (game.players.includes(player._id.toString())) {
      return res.status(400).send({ message: "Player already in game!" });
    }

    // Add player to game
    game.players.push(player._id.toString());
    await game.save();

    // Add game to player's games
    await Player.findByIdAndUpdate(
      player._id,
      { $push: { games: game._id } }
    );

    res.status(200).send(game);
  } catch (error) {
    console.error("Error joining game:", error);
    res.status(500).send({ message: "Unable to join game" });
  }
};

export default gameJoin;