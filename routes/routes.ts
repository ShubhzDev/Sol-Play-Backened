import express from "express";

const router = express.Router();

router.post("/api/register");
router.post("/api/createGame");
router.post("/api/joinGame");
router.post("/api/gameHistory");
router.post("/api/winner");