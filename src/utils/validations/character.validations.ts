import { Request, Response, NextFunction } from "express";

import { isValidJob } from "../../models/jobs.models";

//Joi npm liberary used for validation
import Joi, { ValidationError, ValidationResult } from "joi";

export const characterSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z_]+$/)
    .min(4)
    .max(15)
    .required(),
  job: Joi.string().required(),
});

export const idSchema = Joi.string().uuid().required();

export const validateCharacter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate character data
  const result: ValidationResult = characterSchema.validate(
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

  //Fetch job 
  const isValidJobName = isValidJob(req.body.job) ?? null;

  //Validate Job
  if (!isValidJobName) {
    return res.status(422).json({
      message: "Invalid Job",
      errors: null,
    });
  }

  // If no errors, continue to next handler
  next();
};

export const validateCharacterID = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate character data
  const result: ValidationResult = idSchema.validate(
    req.params.id,
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
