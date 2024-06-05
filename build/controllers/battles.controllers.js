"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleController = void 0;
const battles_models_1 = require("../models/battles.models");
const battleController = (req, res) => {
    try {
        const { character1, character2 } = req.body;
        const log = (0, battles_models_1.battle)(character1, character2);
        res.status(200).json({
            log: log,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.battleController = battleController;
