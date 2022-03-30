import { prisma } from "../../../../database/prisma/prismaClient";

class GetShopItensUseCase {
  async execute() {
    const itens = await prisma.shop_item.findMany({
      select: {
        item_id: true,
        amount: true,
        item: {
          select: {
            name: true,
            price: true,
            type: true,
            avatar_url: true,
          },
        },
      },
    });

    return itens;
  }
}

export { GetShopItensUseCase };
