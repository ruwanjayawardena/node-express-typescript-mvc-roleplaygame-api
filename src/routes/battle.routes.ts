import { Router, Request, Response } from "express";

import { validateBattleCharacterIDs } from "../utils/validations/battle.validations";

import { battleController } from "../controllers/battles.controllers";

const router = Router();

router.post(
  "/", // Path
  validateBattleCharacterIDs, // Middleware
  battleController // Controller
);

export default router;
