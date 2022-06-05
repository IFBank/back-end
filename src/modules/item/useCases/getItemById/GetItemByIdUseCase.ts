import { prisma } from "../../../../database/prisma/prismaClient";

class GetItemByIdUseCase {
  async execute(item_id: string) {
    const item = await prisma.item.findFirst({
      where: {
        id: item_id,
      },
      include: {
        shop_item: {
          select: {
            amount: true,
          },
        },
      },
    });

    return item;
  }
}

export { GetItemByIdUseCase };
