import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../../database/prisma/prismaClient";
import { AppError } from "../../errors/AppError";

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorizationToken = request.headers.authorization;

  if (!authorizationToken) {
    throw new AppError("Token missing", 20225);
  }

  const authorizationTokenSeparator = authorizationToken?.split(" ");
  const [, token] = authorizationTokenSeparator as string[];

  try {
    const { sub: id } = verify(
      token,
      process.env.RA_TOKEN_AUTH_SECRET as string
    );

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Invalid token", 20226, 401);
    }

    request.user = {
      id: user.id,
      is_admin: user.is_admin,
    };

    return next();
  } catch {
    throw new AppError("Invalid token", 20226, 401);
  }
}
