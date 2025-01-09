import { Request, Response } from "express";
import Game from "../models/Game";
import Player from "../models/Player";
import { MoveType } from "../models/types";
import GameHistory from "../models/GameHistory";

export const move = async (req: Request, res: Response) => {
  const { game_id, player_id, move_type, card_id } = req.body;

  if (!game_id || !player_id || !move_type) {
    return res.status(400).send({ message: "Missing required parameters!" });
  }

  if (move_type === MoveType.PLAY && !card_id) {
    return res.status(400).send({ message: "card_id is required for PLAY move!" });
  }

  try {
    const game = await Game.findById(game_id);
    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    const player = await Player.findById(player_id);
    if (!player) {
      return res.status(404).send({ message: "Player not found!" });
    }

    if (game.currentPlayer !== player_id) {
      return res.status(400).send({ message: "Not your turn!" });
    }

    let nextPlayerIndex = game.players.indexOf(player_id);
    
    switch (move_type) {
      case MoveType.DRAW:
        // Draw card from deck
        if (game.deck.length === 0) {
          return res.status(400).send({ message: "No cards left in deck!" });
        }
        const drawnCard = game.deck.pop();
        player.cards?.push(drawnCard!);
        await player.save();
        break;

      case MoveType.PLAY:
        if (!player.cards?.includes(card_id)) {
          return res.status(400).send({ message: "Player doesn't have this card!" });
        }
        // Remove card from player's hand
        player.cards = player.cards.filter(c => c !== card_id);
        game.lastPlayedCard = card_id;
        await player.save();
        break;

      case MoveType.PASS:
        // Just pass the turn
        break;
    }

    // Update next player
    nextPlayerIndex = (nextPlayerIndex + game.direction + game.players.length) % game.players.length;
    game.currentPlayer = game.players[nextPlayerIndex];
    await game.save();

    // Record move in history
    const move = {
      playerId: player_id,
      moveType: move_type,
      cardId: card_id,
      gameId: game_id,
      timestamp: new Date()
    };

    await GameHistory.findOneAndUpdate(
      { gameId: game_id },
      {
        $push: { moves: move },
        $set: {
          'currentState.currentPlayer': game.currentPlayer,
          'currentState.lastPlayedCard': game.lastPlayedCard,
          'currentState.deck': game.deck
        }
      }
    );

    res.status(200).send({ message: "Move recorded successfully", game });
  } catch (error) {
    console.error("Error processing move:", error);
    res.status(500).send({ message: "Error processing move!" });
  }
};