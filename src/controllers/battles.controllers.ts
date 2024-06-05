import { Request, Response } from "express";

import { battle } from "../models/battles.models";

export const battleController = (
  req: Request,
  res: Response
): void => {
  try {
    const {character1, character2} = req.body;
    const log = battle(character1, character2);
    res.status(200).json({
      log: log,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
