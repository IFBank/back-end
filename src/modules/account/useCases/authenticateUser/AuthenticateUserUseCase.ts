import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IAuthenticateUser {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateUser) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Email or password incorrect!", 20224, 401);
    }

    const hashPassword = await compare(password, user?.password);

    if (!hashPassword) {
      throw new AppError("Email or password incorrect!", 20224, 401);
    }

    const token = sign({}, process.env.RA_TOKEN_AUTH_SECRET as string, {
      subject: user.id,
      expiresIn: process.env.RA_TOKEN_AUTH_EXPIRES,
    });

    return token;
  }
}

export { AuthenticateUserUseCase };
