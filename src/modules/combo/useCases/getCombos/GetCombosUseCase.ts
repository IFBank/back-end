import { prisma } from "../../../../database/prisma/prismaClient";
import { combos } from "@prisma/client";

interface ICombosUser {
  user_id: string;
}

interface Item {
  name: string;
  price: number;
  amount: number;
}

interface CombosMonted {
  name: string;
  itens: Item[];
}

class GetCombosUseCase {
  async execute({ user_id }: ICombosUser) {
    const wallet = await prisma.wallet.findFirst({
      where: {
        user_id,
      },
    });

    const combos = await prisma.combos.findMany({
      where: {
        wallet_id: wallet?.id,
      },
      select: {
        name: true,
        combos_item: {
          select: {
            amount: true,
            item: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    return combos;
  }
}

export { GetCombosUseCase };
