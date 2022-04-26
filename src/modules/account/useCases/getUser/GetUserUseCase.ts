import { prisma } from "../../../../database/prisma/prismaClient";

class GetUserUseCase {
  async execute(user_id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        email: true,
        name: true,
        avatar_url: true,
      },
    });

    return user;
  }
}

export { GetUserUseCase };
