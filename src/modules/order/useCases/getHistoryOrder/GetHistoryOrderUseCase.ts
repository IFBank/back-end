import { prisma } from "../../../../database/prisma/prismaClient";

interface IHistory {
  user_id: string;
}

class GetHistoryOrderUseCase {
  async execute({ user_id }: IHistory) {
    const history = await prisma.user_order_history.findMany({
      where: {
        order: {
          wallet: {
            user_id,
          },
        },
      },
      select: {
        retired_date: true,
        order: {
          select: {
            name: true,
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
        },
      },
    });

    return history;
  }
}

export { GetHistoryOrderUseCase };
