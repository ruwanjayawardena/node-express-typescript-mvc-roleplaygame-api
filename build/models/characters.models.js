"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterById = exports.getCharacters = exports.createCharacter = void 0;
const jobs_models_1 = require("./jobs.models");
/**
 * Empty arary define with interface using Array generic type
 */
const characters = [];
/**
 * Generate random V4 UUID
 * @returns string - An random generated RFC 4122 V4 UUID
 */
const generateUUID = () => {
    return crypto.randomUUID();
};
/**
 * F1 - Create new character
 *
 * This function creates a new character and adds it to the characters array. It is modified to accept a
 * character object without 'id', 'alive', 'healthPointsHP', 'strength', 'dexterity', 'intelligence', 'attackModifier' and 'speedModifier' properties (Omit<Character, 'id' | 'alive' | 'healthPointsHP' | 'strength' | 'dexterity' | 'intelligence' | 'attackModifier' | 'speedModifier'>)
 * to ensure the 'id' is automatically generated and unique and rest of objects with default value true and 0.
 *
 * @param character - An object containing the properties of the character to be created, excluding the 'id', 'alive', 'hp', 'strength', 'dexterity', 'intelligence', 'attack' and 'speed' properties.
 * The properties include:
 * - name: The name of the character.
 * - job: The job identifier for the character.
 *
 *  @returns Array - An array containing the newly created character
 */
const createCharacter = (character) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    try {
        const initJobInfo = (0, jobs_models_1.getJobByName)(character.job);
        const newCharacter = Object.assign({ id: generateUUID(), alive: true, hp: (_a = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.hp) !== null && _a !== void 0 ? _a : 0, strength: (_b = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.strength) !== null && _b !== void 0 ? _b : 0, dexterity: (_c = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.dexterity) !== null && _c !== void 0 ? _c : 0, intelligence: (_d = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.intelligence) !== null && _d !== void 0 ? _d : 0, attack: (initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.attack)
                ? initJobInfo.attack({
                    strength: (_e = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.strength) !== null && _e !== void 0 ? _e : 0,
                    dexterity: (_f = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.dexterity) !== null && _f !== void 0 ? _f : 0,
                    intelligence: (_g = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.intelligence) !== null && _g !== void 0 ? _g : 0,
                })
                : 0, speed: (initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.speed)
                ? initJobInfo.speed({
                    strength: (_h = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.strength) !== null && _h !== void 0 ? _h : 0,
                    dexterity: (_j = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.dexterity) !== null && _j !== void 0 ? _j : 0,
                    intelligence: (_k = initJobInfo === null || initJobInfo === void 0 ? void 0 : initJobInfo.intelligence) !== null && _k !== void 0 ? _k : 0,
                })
                : 0 }, character);
        characters.push(newCharacter);
        return newCharacter;
    }
    catch (error) {
        console.error("Error creating character:", error);
        throw new Error("Failed to create character");
    }
};
exports.createCharacter = createCharacter;
/**
 * F2 - Get All Characters
 *
 * @returns {Array<listOfCharacters>} - An array containing all characters. Each character is an object with the following properties:
 * - id: A unique identifier for the character (UUID V4).
 * - name: The name of the character.
 * - job: The job identifier for the character.
 * - alive: A boolean indicating if the character is alive.
 * - healthPointsHP: The current life points of the character.
 * - strength: The strength attribute of the character.
 * - dexterity: The dexterity attribute of the character.
 * - intelligence: The intelligence attribute of the character.
 * - attackModifier: The attack modifier value for the character.
 * - speedModifier: The speed modifier value for the character.
 */
const getCharacters = () => {
    try {
        return characters.map(({ id, name, job, alive }) => {
            return {
                id,
                name,
                job,
                alive: alive ? "Alive" : "Dead",
            };
        });
    }
    catch (error) {
        console.error("Error retrieving characters:", error);
        throw new Error("Failed to get characters");
    }
};
exports.getCharacters = getCharacters;
/**
 * F3 - Get Character By UUID
 *
 * @param id - An UUID string to identify the character
 * @returns Array - An array of characters
 */
const getCharacterById = (id) => {
    try {
        return characters.find((character) => character.id === id);
    }
    catch (error) {
        console.error("Error getting character by ID:", error);
        throw new Error("Failed to get character by ID");
    }
};
exports.getCharacterById = getCharacterById;
