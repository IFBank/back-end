import { prisma } from "../../../../database/prisma/prismaClient";

class ListAllOrdersUseCase {
  async execute() {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        name: true,
        withdraw_date: true,
        order_item: {
          select: {
            amount: true,
            item: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });

    return orders;
  }
}

export { ListAllOrdersUseCase };
