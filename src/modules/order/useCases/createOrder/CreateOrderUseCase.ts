import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { generateIDSequence } from "../../../../utils/generateIDSequence";

interface IOrder {
  wallet_id: string;
  user_id: string;
  itens: any;
}

class CreateOrderUseCase {
  async execute({ user_id, wallet_id, itens }: IOrder) {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id: wallet_id,
      },
    });

    if (!wallet) {
      throw new AppError("Wallet doesn't exist", 202215);
    }

    if (wallet.user_id !== user_id) {
      throw new AppError(
        "User doesn't have permission to access this wallet",
        202216,
        401
      );
    }

    let totalPrice = 0.0;
    let itemAmount: number[] = [];

    if (typeof itens === "object" && itens !== null && !Array.isArray(itens)) {
      for (var [item_id, amount] of Object.entries(itens)) {
        const itemShop = await prisma.shop_item.findFirst({
          where: {
            item_id,
          },
        });

        if (!itemShop) {
          throw new AppError("Item doesn't exist", 202217);
        }

        if (itemShop.amount < (amount as number)) {
          throw new AppError("Item out of stock", 202219);
        }

        const item = await prisma.item.findFirst({
          where: {
            id: item_id,
          },
        });

        itemAmount.push(itemShop.amount);
        totalPrice += (amount as number) * item!.price;
      }
    } else {
      throw new AppError("Itens required");
    }

    if (wallet.money < totalPrice) {
      throw new AppError("User doesn't have money sufficient", 202218, 401);
    }

    await prisma.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        money: wallet.money - totalPrice,
      },
    });

    const order = await prisma.order.create({
      data: {
        withdraw_date: new Date(),
        wallet_id: wallet.id,
        name: generateIDSequence(8),
      },
      select: {
        id: true,
        name: true,
      },
    });

    let index = 0;
    for (var [item_id, amount] of Object.entries(itens)) {
      await prisma.order_item.create({
        data: {
          amount: amount as number,
          item_id,
          order_id: order.id,
        },
      });

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

    return order.name;
  }
}

export { CreateOrderUseCase };
