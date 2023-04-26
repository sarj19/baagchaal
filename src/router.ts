import express, { Express } from 'express';
import path from 'path';
import { v4 as uuid } from 'uuid';

import { getNewGame, joinGame, PieceType } from './database';

const DEFAULT_DESIGNATION = "goat";

export default function setupRouters(app: Express, dirname: string) {
  // serve up production assets
  app.use(express.static("client/build"));

  // TODO app.post('/log') all steps , winner

  app.get("/newgame", async ({ query }, res) => {
    const userId = getUserId(query.userId);
    const designation = getDesignation(query.designation);

    const gameHash = await getNewGame(userId, designation);
    if (gameHash == null) {
      res.send({ error: "creating new game failed" });
    } else {
      res.send({ gameHash, userId, designation });
    }
  });

  app.get("/joingame", async ({ query }, res) => {
    const gameHash = query.gameHash;
    if (typeof gameHash != "string" || gameHash.length == 0) {
      res.send({ error: "game hash invalid" });
    } else {
      const userId = getUserId(query.userId);
      const userIdsAndMoves = await joinGame(userId, gameHash);

      if (userIdsAndMoves != null) {
        const moves = userIdsAndMoves.moves.map((moves) => [
          moves.from,
          moves.to,
        ]);
        if (userIdsAndMoves.goat == userId) {
          res.send({
            gameHash,
            userId,
            moves,
            designation: "goat",
            opponentId: userIdsAndMoves.tiger,
          });
        } else if (userIdsAndMoves.tiger == userId) {
          res.send({
            gameHash,
            userId,
            moves,
            designation: "tiger",
            opponentId: userIdsAndMoves.goat,
          });
        }
        return;
      }

      res.send({ error: "unable to join game" });
    }
  });

  // let the react app to handle any unknown routes
  // serve up the index.html if express does'nt recognize the route
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(dirname, "client", "build", "index.html"));
  });
}

function getUserId(userId: any): string {
  return typeof userId == "string" && userId.length > 0 ? userId : uuid();
}

function getDesignation(designation: any): PieceType {
  return designation == "goat" || designation == "tiger"
    ? designation
    : DEFAULT_DESIGNATION;
}
