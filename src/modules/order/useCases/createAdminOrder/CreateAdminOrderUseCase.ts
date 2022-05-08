import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

class CreateAdminOrderUseCase {
  async execute(itens: any) {
    let itemAmount: number[] = [];
    if (typeof itens === "object" && itens !== null && !Array.isArray(itens)) {
      for (var [item_id, amount] of Object.entries(itens)) {
        const itemShop = await prisma.shop_item.findFirst({
          where: {
            item_id,
          },
        });

        if (!itemShop) {
          throw new AppError("Item doesn't exist", 202225);
        }

        if (itemShop.amount < (amount as number)) {
          throw new AppError("Item out of stock", 202226);
        }

        itemAmount.push(itemShop.amount);
      }
    } else {
      throw new AppError("Itens required");
    }

    let index = 0;
    for (var [item_id, amount] of Object.entries(itens)) {
      await prisma.shop_item.update({
        where: {
          item_id,
        },
        data: {
          amount: itemAmount[index] - (amount as number),
        },
      });

      index += 1;
    }
  }
}

export { CreateAdminOrderUseCase };
