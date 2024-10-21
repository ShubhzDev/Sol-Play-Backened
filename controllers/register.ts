import { Request, Response } from "express";
import { addPlayer } from "../db/crud";

const registration = async (req: Request, res: Response) => {
  const { discord_id, discord_name, user_name, player_name } =
    req.body;

  if (!discord_id) {
    res.status(400).send({ message: "discord_id is missing!" });
    return;
  }

  if (!discord_name) {
    res.status(400).send({ message: "discord_name is missing!" });
    return;
  }

  if (!user_name) {
    res.status(400).send({ message: "user_name is missing!" });
    return;
  }

  if (!player_name) {
    res.status(400).send({ message: "player_name is missing!" });
    return;
  }

  const player = await addPlayer(discord_id,discord_name,user_name,player_name);
  if(!player){
    res.status(500).send({message:"Unable to Register Player!"});
    return;
  }

  console.log("player : ",player);

  res.status(200).send(player);
};

export default registration;
