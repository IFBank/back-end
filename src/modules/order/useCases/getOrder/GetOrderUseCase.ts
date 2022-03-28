import { prisma } from "../../../../database/prisma/prismaClient";

interface IOrderUser {
  user_id: string;
}

class GetOrderUseCase {
  async execute({ user_id }: IOrderUser) {
    const order = await prisma.order.findMany({
      where: {
        wallet: {
          user_id,
        },
      },
      select: {
        name: true,
        withdraw_date: true,
        order_item: {
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

    return order;
  }
}

export { GetOrderUseCase };
