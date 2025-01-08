import { NextFunction, Request, Response } from "express";
import Player from "../models/Player";

const registration = async (req: Request, res: Response) => {
  const { discord_id, discord_name, user_name, player_name } = req.body;

  if (!discord_id) {
    return res.status(400).send({ message: "discord_id is missing!" });
  }

  if (!discord_name) {
    return res.status(400).send({ message: "discord_name is missing!" });
  }

  if (!user_name) {
    return res.status(400).send({ message: "user_name is missing!" });
  }

  if (!player_name) {
    return res.status(400).send({ message: "player_name is missing!" });
  }

  try {
    const existingPlayer = await Player.findOne({ discordId: discord_id });
    if (existingPlayer) {
      return res.status(200).send(existingPlayer);
    }

    const player = await Player.create({
      discordId: discord_id,
      discordName: discord_name,
      userName: user_name,
      name: player_name
    });

    res.status(200).send(player);
  } catch (error) {
    console.error("Error registering player:", error);
    res.status(500).send({ message: "Unable to Register Player!" });
  }
};

export default registration;