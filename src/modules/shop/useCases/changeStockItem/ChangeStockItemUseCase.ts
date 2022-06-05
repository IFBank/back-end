import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IChangeStockItem {
  item_id: string;
  amount: number;
}

class ChangeStockItemUseCase {
  async execute({ amount, item_id }: IChangeStockItem) {
    const item = await prisma.shop_item.findFirst({
      where: {
        item_id,
      },
    });

    if (!item) {
      throw new AppError("ID don't exists", 202227);
    }

    await prisma.shop_item.update({
      where: {
        item_id,
      },
      data: {
        amount,
      },
    });
  }
}

export { ChangeStockItemUseCase };
