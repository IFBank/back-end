import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from "./routes";
import { AppError } from "../errors/AppError";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({
    message: "Hello world!",
  });
});

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        code: err.errorCode,
        message: err.message
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

export { app };
