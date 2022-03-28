import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IWalletMoney {
  user_id: string;
}

class GetWalletMoneyUseCase {
  async execute({ user_id }: IWalletMoney) {
    const wallet = await prisma.wallet.findFirst({
      where: {
        user_id,
      },
    });

    if (!wallet) {
      throw new AppError("User doesn't exists", 202224, 401);
    }

    return wallet.money;
  }
}

export { GetWalletMoneyUseCase };
