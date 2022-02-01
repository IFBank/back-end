import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { is_admin } = request.user;

  if (!is_admin) {
    throw new AppError("User doesn't have permission", 20227, 401);
  }

  return next();
}
