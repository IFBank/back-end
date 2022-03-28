import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface ICombo {
  name: string;
  user_id: string;
}

class CreateComboUseCase {
  async execute({ name, user_id }: ICombo) {
    const wallet = await prisma.wallet.findFirst({
      where: {
        user_id,
      },
    });

    if (!wallet) {
      throw new AppError("User doesn't exist", 20229);
    }

    await prisma.combos.create({
      data: {
        name,
        wallet_id: wallet.id,
      },
    });
  }
}

export { CreateComboUseCase };
