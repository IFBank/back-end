import { hash } from "bcrypt";
import md5 from "md5";
import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IUser {
  ra_token: string;
  ra: string;
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
  async execute({ ra_token, email, name, password, ra }: IUser) {
    const token = md5(`${process.env.RA_TOKEN_SECRET}${ra}`);

    if (token !== ra_token) {
      throw new AppError("Token invalid");
    }

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("Email already exist", 20222);
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
