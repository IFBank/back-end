import schedule from "node-schedule";
import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IOrder {
  order_id: string;
}

class FinishOrderByIdUseCase {
  async execute({ order_id }: IOrder) {
    const order = await prisma.order.findFirst({
      where: {
        id: order_id,
      },
    });

    if (!order) {
      throw new AppError("Order don't exists", 400);
    }

    const job = schedule.scheduledJobs[order.id];
    job.cancel();

    await prisma.order.delete({
      where: {
        id: order.id,
      },
    });
  }
}

export { FinishOrderByIdUseCase };
