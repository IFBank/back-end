import { prisma } from "../../../../database/prisma/prismaClient";

class GetOrderByIdUseCase {
  async execute(id: string) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        withdraw_date: true,
        wallet: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        order_item: {
          select: {
            amount: true,
            item: {
              select: {
                id: true,
                avatar_url: true,
                name: true,
                price: true,
                type: true,
              },
            },
          },
        },
      },
    });

    return order;
  }
}

export { GetOrderByIdUseCase };
