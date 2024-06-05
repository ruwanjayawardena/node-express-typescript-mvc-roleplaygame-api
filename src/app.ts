import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes";
import { rateLimit } from "express-rate-limit";

// Create Express server
const app = express(); // New express instance

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 8080;

//configure CORS
var corsConfig = {
  origin: `http://localhost:${port}`,
  optionsSuccessStatus: 200,
};

// Enable rate limiter
const ratelimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per minute).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  message: "You have exceeded your 5 requests per minute limit.",
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Express configuration

//middleware for rate limit
app.use(ratelimiter);

app.use(cors(corsConfig)); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan("dev")); // Enable Morga
app.use(express.json()); // <=== Enable JSON body parser.
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// Use routes
app.use("/", router); // api/ is good

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
export default app;