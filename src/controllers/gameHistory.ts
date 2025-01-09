import { Request, Response } from "express";
import GameHistory from "../models/GameHistory";
import Move from "../models/Move";
import Card from "../models/Card";

export const gameHistory = async (req: Request, res: Response) => {
  const { game_id, card_id, move } = req.body;

  if (!game_id) {
    return res.status(400).send({ message: "game_id is missing!" });
  }

  if (!card_id) {
    return res.status(400).send({ message: "card_id is missing!" });
  }

  if (!move) {
    return res.status(400).send({ message: "move is missing!" });
  }

  try {
    const card = await Card.findById(card_id);
    if (!card) {
      return res.status(404).send({ message: "Card not found!" });
    }

    let history = await GameHistory.findOne({ gameId: game_id });
    if (!history) {
      history = await GameHistory.create({ gameId: game_id, moves: [] });
    }

    const newMove = await Move.create({
      playerId: move.playerId,
      cardId: card_id,
      gameHistoryId: history._id
    });

    history.moves.push(newMove._id);
    await history.save();

    res.status(200).send(history);
  } catch (error) {
    console.error("Error updating game history:", error);
    res.status(500).send({ message: "Error updating game history!" });
  }
};

export default gameHistory;