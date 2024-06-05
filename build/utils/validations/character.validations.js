"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCharacterID = exports.validateCharacter = exports.idSchema = exports.characterSchema = void 0;
const jobs_models_1 = require("../../models/jobs.models");
//Joi npm liberary used for validation
const joi_1 = __importDefault(require("joi"));
exports.characterSchema = joi_1.default.object({
    name: joi_1.default.string()
        .pattern(/^[A-Za-z_]+$/)
        .min(4)
        .max(15)
        .required(),
    job: joi_1.default.string().required(),
});
exports.idSchema = joi_1.default.string().uuid().required();
const validateCharacter = (req, res, next) => {
    var _a;
    // Validate character data
    const result = exports.characterSchema.validate(req.body, { abortEarly: false } // Return all errors
    );
    // If rest of errors, return error response
    if (result.error) {
        return res.status(422).json({
            message: "Invalid request data",
            errors: result.error.details.map((err) => err.message),
        });
    }
    //Fetch job 
    const isValidJobName = (_a = (0, jobs_models_1.isValidJob)(req.body.job)) !== null && _a !== void 0 ? _a : null;
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
exports.validateCharacter = validateCharacter;
const validateCharacterID = (req, res, next) => {
    // Validate character data
    const result = exports.idSchema.validate(req.params.id, { abortEarly: false } // Return all errors
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
exports.validateCharacterID = validateCharacterID;
