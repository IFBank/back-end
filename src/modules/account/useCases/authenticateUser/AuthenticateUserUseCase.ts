import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";
import * as Yup from "yup";

interface IAuthenticateUser {
  email: string;
  password: string;
}

const authValidate = Yup.object().shape({
  password: Yup.string()
    .trim()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Invalid password"
    )
    .typeError("Password must be string")
    .strict(),
  email: Yup.string()
    .email("Email invalid")
    .strict()
    .typeError("Email must be stirng"),
});

class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateUser) {
    try {
      await authValidate.validate(
        { email, password },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        throw new AppError(err.errors[0], 202223);
      }
    }

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
