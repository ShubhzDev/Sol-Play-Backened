import { Response, Request } from "express";
import { joinGame } from "../db/crud";

const gameJoin = async (req: Request, res: Response) => {
  const{game_id,discord_id} = req.body;
  console.log(req.body);

  if (!game_id) {
    res.status(500).send({ message: "game_id is missing!" });
    return;
  }

  if (!discord_id) {
    res.status(500).send({ message: "discord_id is missing!" });
    return;
  }

  const game = await joinGame(game_id, discord_id);
  if(!game){
    res.status(500).send({message:"Unable to join game"});
    return;
  }

  res.status(200).send(game);
};

export default gameJoin;
