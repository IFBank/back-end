import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface ICombo {
  name: string;
  wallet_id: string;
  user_id: string;
}

class CreateComboUseCase {
  async execute({ name, wallet_id, user_id }: ICombo) {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id: wallet_id,
      },
    });

    if (!wallet) {
      throw new AppError("Wallet doesn't exist", 20229);
    }

    if (wallet.user_id !== user_id) {
      throw new AppError("User doesn't have permission", 202210, 401);
    }

    await prisma.combos.create({
      data: {
        name,
        wallet_id,
      },
    });
  }
}

export { CreateComboUseCase };
