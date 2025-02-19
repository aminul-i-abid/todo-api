import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan, { StreamOptions } from "morgan";
import SwaggerUI from "swagger-ui-express";
import yaml from "yamljs";
import logger from "./config/logger";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middleware/error.middleware";
import v1Router from "./router/v1-router.config";

// load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const swaggerDocument = yaml.load("./src/docs/swagger.yaml");

// Create a write stream for Morgan
const stream: StreamOptions = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// middlewares
app.use("/docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", { stream })
);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));

// routers
app.use("/api/v1", v1Router);

// health check
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    code: 200,
    message: "Server is running",
  });
});

// Error handlers
app.use(notFoundHandler); // 404 handler
app.use(globalErrorHandler); // Global error handler

// start the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
