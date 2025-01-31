// Library Imports
import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit"

// Custom Imports
import { PORT, NodeEnv, PROD_URL } from "./config"
import { rootRouter } from "./routes"

const server = express()
const limiter = rateLimit({
    windowMs: 15 * 60 ^ 1000,
    max: 50,
    message: "Too many requests, Request limit exceeded!"
})

server.use(cors({
    credentials: true,
    origin: NodeEnv === "production" ? PROD_URL : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

if (NodeEnv === "production") {
    server.use(limiter)
}

server.use(express.json({ limit: "5mb" }))
server.use(express.urlencoded({ limit: "5mb", extended: true }))
server.use(cookieParser())
server.use(helmet())
server.use(compression())

// Handler Middlewares
server.use("/api", rootRouter)

server.listen(PORT, () => {
    console.log(`Serving at: ${PORT}`);
})