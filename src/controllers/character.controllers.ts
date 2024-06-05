import { Request, Response } from "express";

import {
  Character,
  createCharacter,
  getCharacters,
  getCharacterById,
} from "../models/characters.models";

export const getCharactersController = (req: Request, res: Response): void => {
  try {
    const characters: Character[] = getCharacters();
    res.status(200).json({ characters });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCharacterByIdController = (
  req: Request,
  res: Response
): void => {
  try {
    const id: string | null = req.params.id?.toString().toLowerCase() ?? null;
    if (!id) {
      res.status(404).json({ message: "Player not found!" });
    }
    const characters: Character | undefined = getCharacterById(id);
    if (!characters) {
      res.status(404).json({ message: "Player not found!" });
    }
    res.status(200).json({ characters });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCharacterController = (
  req: Request,
  res: Response
): void => {
  try {
    const characters: Character = req.body;
    const newCharacter = createCharacter(characters);
    res.status(201).json({
      message: "User created",
      newCharacter,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
