import { Request, Response } from "express";
import Game from "../models/Game";
import Player from "../models/Player";
import Card from "../models/Card";
import { shuffleArray } from "../utils/shuffleArray";
import { IGameState } from "../models/types";
import GameHistory from "../models/GameHistory";

export const cardDistribute = async (req: Request, res: Response) => {
  const { game_id } = req.body;

  if (!game_id) {
    return res.status(400).send({ message: "game_id is missing!" });
  }

  try {
    const game = await Game.findById(game_id).populate('players');
    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    // Get all cards
    const cards = await Card.find();
    const cardIds = cards.map(card => card._id.toString());
    
    // Shuffle cards
    const shuffledDeck = shuffleArray([...cardIds]);

    // Distribute 7 cards to each player
    const playerCards: { [key: string]: string[] } = {};
    let currentIndex = 0;

    for (const playerId of game.players) {
      playerCards[playerId.toString()] = shuffledDeck.slice(currentIndex, currentIndex + 7);
      currentIndex += 7;
      
      // Update player's cards
      await Player.findByIdAndUpdate(playerId, {
        $set: { cards: playerCards[playerId.toString()] }
      });
    }

    // Set remaining cards as deck
    game.deck = shuffledDeck.slice(currentIndex);
    game.currentPlayer = game.players[0].toString();
    game.direction = 1;
    await game.save();

    // Update game state in history
    await updateGameState(game_id, {
      gameId: game_id,
      players: game.players.map(playerId => ({
        playerId: playerId.toString(),
        cards: playerCards[playerId.toString()]
      })),
      currentPlayer: game.currentPlayer,
      direction: game.direction,
      deck: game.deck
    });

    res.status(200).send({
      message: "Cards distributed successfully",
      playerCards,
      remainingCards: game.deck.length
    });
  } catch (error) {
    console.error("Error distributing cards:", error);
    res.status(500).send({ message: "Error distributing cards!" });
  }
};

async function updateGameState(gameId: string, gameState: IGameState) {
  const history = await GameHistory.findOne({ gameId });
  if (history) {
    history.states.push(gameState);
    await history.save();
  }
}