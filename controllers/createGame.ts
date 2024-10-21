import { Request, Response } from "express";
import { createGame } from "../db/crud";

const gameCreation = async (req: Request, res: Response) => {
  const { discord_id, game_type } = req.body;
  console.log(req.body);
  if (!discord_id) {
    res.status(500).send({ message: "discord_id parameter is missing!" });
    return;
  }

  if (!game_type) {
    res.status(500).send({ message: "game_type parameter is missing!" });
    return;
  }

  const game = await createGame(discord_id, game_type);
  if(!game){
    res.status(500).send({message:"Unable to create Game!"});
    return;
  }

  res.status(200).send(game);
};

export default gameCreation;
