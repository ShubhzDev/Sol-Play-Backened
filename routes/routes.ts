import express from "express";
import registration from "../controllers/register";
import gameCreation from "../controllers/createGame";
import gameJoin from "../controllers/joinGame";
import gameHistory from "../controllers/gameHistory";
import winner from "../controllers/winner";

const router = express.Router();

router.post("/register",registration);
router.post("/createGame",gameCreation);
router.post("/joinGame",gameJoin);
router.post("/gameHistory",gameHistory);
router.post("/winner",winner);

export default router;