// Library Imports
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import http from "http"; // Add this

// Custom Imports
import { PORT, NodeEnv, PROD_URL } from "./config";
import rootRouter from "./routes";

// ------------- WebSocket Setup -------------
import { setupWebSocketServer } from "./lib/socket";

// Express App & HTTP Server
const app = express();
const server = http.createServer(app); // Create an HTTP server from Express

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fix incorrect `^` operator
  max: 50,
  message: "Too many requests, Request limit exceeded!",
});

app.use(
  cors({
    credentials: true,
    origin: NodeEnv === "production" ? PROD_URL : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

if (NodeEnv === "production") {
  app.use(limiter);
}

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// Handler Middlewares
app.use("/api", rootRouter);
setupWebSocketServer(server); // Attach WebSocket to the same HTTP server

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
