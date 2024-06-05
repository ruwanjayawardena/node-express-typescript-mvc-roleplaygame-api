"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const express_rate_limit_1 = require("express-rate-limit");
// Create Express server
const app = (0, express_1.default)(); // New express instance
// Load environment variables from .env file
dotenv_1.default.config();
const port = process.env.PORT || 8080;
//configure CORS
var corsConfig = {
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200,
};
// Enable rate limiter
const ratelimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000, // 1 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per minute).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    message: "You have exceeded your 5 requests per minute limit.",
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
// Express configuration
//middleware for rate limit
app.use(ratelimiter);
app.use((0, cors_1.default)(corsConfig)); // Enable CORS
app.use((0, helmet_1.default)()); // Enable Helmet
app.use((0, morgan_1.default)("dev")); // Enable Morga
app.use(express_1.default.json()); // <=== Enable JSON body parser.
app.use(express_1.default.urlencoded({ extended: true })); // support encoded bodies
// Use routes
app.use("/", routes_1.default); // api/ is good
// Start Express server
app.listen(port, () => {
    // Callback function when server is successfully started
    console.log(`Server started at http://localhost:${port}`);
});
// Export Express app
exports.default = app;
