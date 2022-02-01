import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IShopItem {
  item_id: string;
  amount: number;
}

class CreateItemShopUseCase {
  async execute({ amount, item_id }: IShopItem) {
    const item = await prisma.item.findFirst({
      where: {
        id: item_id,
      },
    });

    if (!item) {
      throw new AppError("Item doesn't exist", 20228);
    }

    const shop_item = await prisma.shop_item.findFirst({
      where: {
        item_id,
      },
    });

    if (shop_item) {
      throw new AppError("Item on shop already exist", 202213);
    }

    await prisma.shop_item.create({
      data: {
        amount,
        item_id,
      },
    });
  }
}

export { CreateItemShopUseCase };
