"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battle = void 0;
const characters_models_1 = require("../models/characters.models");
/**
 * calculate Damage
 *
 * @param player - An Object of player
 *
 * @returns Number
 */
const calculateDamage = (player) => {
    try {
        // Generate random integer for this game between 0 and max attach power (inclusive) to get possible attach to defender
        return Math.floor(Math.random() * player.attack) + 1;
    }
    catch (error) {
        throw new Error("Error calculating damage!");
    }
};
/**
 * calculate Speed
 *
 * @param player - An Object of player
 *
 * @returns Number
 */
const calculateSpeed = (player) => {
    try {
        return Math.floor(Math.random() * player.speed) + 1;
    }
    catch (error) {
        throw new Error("Error calculating speed!");
    }
};
//
/**
 * F4 - Battle
 *
 * NODE - speed and attack comes as number from api by selected 2 character from api.
 * @param cha1Id String
 * @param cha2Id String
 *
 * @returns Array - String log array
 */
const battle = (cha1Id, cha2Id) => {
    try {
        const character1 = (0, characters_models_1.getCharacterById)(cha1Id);
        const character2 = (0, characters_models_1.getCharacterById)(cha2Id);
        if (!character1 || !character2) {
            throw new Error("Failed to load characters for battle");
        }
        const log = [];
        let isDead = false;
        let attacker;
        let defender;
        let attackerSpeed;
        let defenderSpeed;
        let winner;
        log.push(`Battle between ${character1.name} (${character1.job}) - ${character1.hp} HP and ${character2.name} (${character2.job}) - ${character2.hp} HP begins!`);
        //this will run untill 1 character dead
        while (!isDead) {
            const character1Speed = calculateSpeed(character1);
            const character2Speed = calculateSpeed(character2);
            if (character1Speed > character2Speed) {
                attacker = character1;
                defender = character2;
                attackerSpeed = character1Speed;
                defenderSpeed = character2Speed;
            }
            else {
                attacker = character2;
                defender = character1;
                attackerSpeed = character2Speed;
                defenderSpeed = character1Speed;
            }
            log.push(`${attacker.name} (${attacker.job}) with ${attackerSpeed} speed was faster than ${defender.name} (${defender.job}) with ${defenderSpeed} speed and will attack first.`);
            // Attack and update HP
            const damage = calculateDamage(attacker);
            //untill defender not dead while loop will execute base on this factor
            if (defender.hp < damage) {
                defender.hp = 0;
                winner = attacker;
                isDead = true;
            }
            else {
                defender.hp -= damage;
            }
            log.push(`${attacker.name} attacks ${defender.name} for ${damage}, ${defender.name} has ${defender.hp} HP remaining.`);
            if (!isDead) {
                // Defender gets a turn if not dead
                const counterDamage = calculateDamage(defender);
                if (attacker.hp < damage) {
                    attacker.hp = 0;
                    winner = defender;
                    isDead = true;
                }
                else {
                    attacker.hp -= counterDamage;
                }
                log.push(`${defender.name} attacks ${attacker.name} back for ${counterDamage}, ${attacker.name} has ${attacker.hp} HP remaining.`);
            }
        }
        if (isDead) {
            log.push(`${winner === null || winner === void 0 ? void 0 : winner.name} wins the battle! ${winner === null || winner === void 0 ? void 0 : winner.name} still has ${winner === null || winner === void 0 ? void 0 : winner.hp} HP remaining.`);
        }
        return log.join("\n");
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to execute battle");
    }
};
exports.battle = battle;
