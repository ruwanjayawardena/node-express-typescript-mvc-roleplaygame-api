"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCharacterController = exports.getCharacterByIdController = exports.getCharactersController = void 0;
const characters_models_1 = require("../models/characters.models");
const getCharactersController = (req, res) => {
    try {
        const characters = (0, characters_models_1.getCharacters)();
        res.status(200).json({ characters });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCharactersController = getCharactersController;
const getCharacterByIdController = (req, res) => {
    var _a, _b;
    try {
        const id = (_b = (_a = req.params.id) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) !== null && _b !== void 0 ? _b : null;
        if (!id) {
            res.status(404).json({ message: "Player not found!" });
        }
        const characters = (0, characters_models_1.getCharacterById)(id);
        if (!characters) {
            res.status(404).json({ message: "Player not found!" });
        }
        res.status(200).json({ characters });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCharacterByIdController = getCharacterByIdController;
const createCharacterController = (req, res) => {
    try {
        const characters = req.body;
        const newCharacter = (0, characters_models_1.createCharacter)(characters);
        res.status(201).json({
            message: "User created",
            newCharacter,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createCharacterController = createCharacterController;
