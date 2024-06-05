"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBattleCharacterIDs = exports.idSchema = void 0;
//Joi npm liberary used for validation
const joi_1 = __importDefault(require("joi"));
exports.idSchema = joi_1.default.object({
    character1: joi_1.default.string().uuid().required(),
    character2: joi_1.default.string().uuid().required(),
});
const validateBattleCharacterIDs = (req, res, next) => {
    // Validate character data
    const result = exports.idSchema.validate(req.body, { abortEarly: false } // Return all errors
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
exports.validateBattleCharacterIDs = validateBattleCharacterIDs;
