import {
  getJobByName,
  JobType
} from "./jobs.models";

export interface Character {
  name: string;
  job: JobType;
}

export interface CharacterAlive {
  alive: boolean;
}

export interface stats {
  hp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  attack: number;
  speed: number;
}

export interface CharacterWithStats extends Character, stats, CharacterAlive {
  id: string;
}

export interface listOfCharacters extends Character {
  id: string;
  alive: string;
}

/**
 * Empty arary define with interface using Array generic type
 */
const characters: Array<CharacterWithStats> = [];

/**
 * Generate random V4 UUID
 * @returns string - An random generated RFC 4122 V4 UUID
 */
const generateUUID = (): string => {
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
export const createCharacter = (
  character: Omit<
    Character,
    | "id"
    | "alive"
    | "hp"
    | "strength"
    | "dexterity"
    | "intelligence"
    | "attack"
    | "speed"
  >
): CharacterWithStats => {
  try {
    const initJobInfo = getJobByName(character.job);
    const newCharacter: CharacterWithStats = {
      id: generateUUID(),
      alive: true,
      hp: initJobInfo?.hp ?? 0,
      strength: initJobInfo?.strength ?? 0,
      dexterity: initJobInfo?.dexterity ?? 0,
      intelligence: initJobInfo?.intelligence ?? 0,
      attack: initJobInfo?.attack
        ? initJobInfo.attack({
            strength: initJobInfo?.strength ?? 0,
            dexterity: initJobInfo?.dexterity ?? 0,
            intelligence: initJobInfo?.intelligence ?? 0,
          })
        : 0,
      speed: initJobInfo?.speed
        ? initJobInfo.speed({
            strength: initJobInfo?.strength ?? 0,
            dexterity: initJobInfo?.dexterity ?? 0,
            intelligence: initJobInfo?.intelligence ?? 0,
          })
        : 0,
      ...character,
    };

    characters.push(newCharacter);

    return newCharacter;
  } catch (error) {
    console.error("Error creating character:", error);
    throw new Error("Failed to create character");
  }
};

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
export const getCharacters = (): Array<listOfCharacters> => {
  try {
    return characters.map(({ id, name, job, alive }) => {
      return {
        id,
        name,
        job,
        alive: alive ? "Alive" : "Dead",
      };
    });
  } catch (error) {
    console.error("Error retrieving characters:", error);
    throw new Error("Failed to get characters");
  }
};

/**
 * F3 - Get Character By UUID
 *
 * @param id - An UUID string to identify the character
 * @returns Array - An array of characters
 */
export const getCharacterById = (id: string): CharacterWithStats | undefined => {
  try {
    return characters.find((character) => character.id === id);
  } catch (error) {
    console.error("Error getting character by ID:", error);
    throw new Error("Failed to get character by ID");
  }
};