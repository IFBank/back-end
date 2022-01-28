import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IAddItem {
  combos_id: string;
  item_id: string;
  amount: number;
  user_id: string;
}

class AddItemUseCase {
  async execute({ amount, item_id, combos_id, user_id }: IAddItem) {
    const combo = await prisma.combos.findFirst({
      where: {
        id: combos_id,
      },
    });

    if (!combo) {
      throw new AppError("Combo don't exists", 202211);
    }

    const wallet = await prisma.wallet.findFirst({
      where: {
        user_id,
      },
    });

    if (combo.wallet_id !== wallet?.id) {
      throw new AppError("User don't have permission", 202212, 401);
    }

    const combo_item = await prisma.combos_item.findFirst({
      where: {
        combos_id,
        item_id,
      },
    });

    if (combo_item) {
      throw new AppError("Item on combo already exists", 202214);
    }

    await prisma.combos_item.create({
      data: {
        amount,
        combos_id,
        item_id,
      },
    });
  }
}

export { AddItemUseCase };
