import { Router, Request, Response } from "express";
import {
  getCharactersController,
  getCharacterByIdController,
  createCharacterController
} from "../controllers/character.controllers";

import { validateCharacter, validateCharacterID } from "../utils/validations/character.validations";

// New Router instance
const router = Router();

// Character routes
router.get("/", getCharactersController);
router.get("/:id", validateCharacterID, getCharacterByIdController);
router.post(
  "/", // Path
  validateCharacter, // Middleware
  createCharacterController // Controller
);

export default router;
