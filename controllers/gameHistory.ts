import { Response, Request } from "express";
import { updateGameHistory } from "../db/crud";

const gameHistory = async (res: Response, req: Request) => {
  const { game_id, card_id, move } = req.body;

  if (game_id) {
    res.status(500).send({ message: "game_id is missing!" });
    return;
  }

  if (card_id) {
    res.status(500).send({ message: "card_id is missing!" });
    return;
  }

  if (move) {
    res.status(500).send({ message: "move is missing!" });
    return;
  }

  const gameHistory = await updateGameHistory(game_id, card_id, move);

  if(!gameHistory){
    res.status(500).send({message:"Error Fetching gameHistory!"});
    return;
  }

  res.status(200).send(gameHistory);
};

export default gameHistory;
