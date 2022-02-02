import { hash } from "bcrypt";
import md5 from "md5";
import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";
import * as Yup from "yup";

interface IUser {
  ra_token: string;
  ra: string;
  name: string;
  email: string;
  password: string;
}

const userValidate = Yup.object().shape({
  ra: Yup.string()
    .typeError("RA must be string")
    .matches(/^\d{6}/, "RA invalid")
    .required("RA is required")
    .trim()
    .strict(),
  name: Yup.string()
    .max(30, "Name is too long")
    .min(5, "Name is too short")
    .matches(
      /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
      "Username invalid"
    )
    .required("Name is required")
    .typeError("Name must be text")
    .trim()
    .strict(),
  ra_token: Yup.string()
    .required("RA Token is required")
    .strict()
    .trim()
    .typeError("RA Token must be text"),
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

class CreateUserUseCase {
  async execute({ ra_token, email, name, password, ra }: IUser) {
    try {
      await userValidate.validate(
        { ra_token, email, name, password, ra },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        throw new AppError(err.errors[0], 202222);
      }
    }

    const token = md5(`${process.env.RA_TOKEN_SECRET}${ra}`);

    if (token !== ra_token) {
      throw new AppError("Token invalid", 202221);
    }

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            ifms: {
              ra,
            },
          },
        ],
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exist", 20222);
    }

    const ifms = await prisma.ifms.findFirst({
      where: {
        ra,
      },
    });

    const hashPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
        ifms_id: ifms!.id,
      },
    });

    await prisma.wallet.create({
      data: {
        money: 0,
        user_id: user.id,
      },
    });
  }
}

export { CreateUserUseCase };
