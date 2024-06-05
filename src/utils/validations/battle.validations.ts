import { Request, Response, NextFunction } from "express";

//Joi npm liberary used for validation
import Joi, { ValidationError, ValidationResult } from "joi";

export const idSchema = Joi.object({
  character1: Joi.string().uuid().required(),
  character2: Joi.string().uuid().required(),
});

export const validateBattleCharacterIDs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate character data
  const result: ValidationResult = idSchema.validate(
    req.body,
    { abortEarly: false } // Return all errors
  );

  // If rest of errors, return error response
  if (result.error) {
    return res.status(422).json({
      message: "Invalid request data",
      errors: result.error.details.map((err) => err.message),
    });
  }

  // If no errors, continue to next handler
  next();
};
