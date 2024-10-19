import { Request, Response } from "express";
import { createGame } from "../db/crud";

const gameCreation = async (req: Request, res: Response) => {
  const discord_id = req.body.discord_id;
  const game_type = req.body.gameType;

  if (!discord_id) {
    return res
      .status(500)
      .send({ message: "discord_id parameter is missing!" });
  }

  if (!game_type) {
    return res.status(500).send({ message: "game_type parameter is missing!" });
  }

  createGame(discord_id,game_type);

};
