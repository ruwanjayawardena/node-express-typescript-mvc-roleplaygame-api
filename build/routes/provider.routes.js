"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const character_controllers_1 = require("../controllers/character.controllers");
const character_validations_1 = require("../utils/validations/character.validations");
// New Router instance
const router = (0, express_1.Router)();
// Character routes
router.get("/", character_controllers_1.getCharactersController);
router.get("/:id", character_validations_1.validateCharacterID, character_controllers_1.getCharacterByIdController);
router.post("/", // Path
character_validations_1.validateCharacter, // Middleware
character_controllers_1.createCharacterController // Controller
);
exports.default = router;
