"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const battle_validations_1 = require("../utils/validations/battle.validations");
const battles_controllers_1 = require("../controllers/battles.controllers");
const router = (0, express_1.Router)();
router.post("/", // Path
battle_validations_1.validateBattleCharacterIDs, // Middleware
battles_controllers_1.battleController // Controller
);
exports.default = router;
