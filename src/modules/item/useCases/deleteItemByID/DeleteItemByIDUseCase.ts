import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

class DeleteItemByIDUseCase {
  async execute(item_id: string) {
    const item = await prisma.item.findFirst({
      where: {
        id: item_id,
      },
    });

    if (!item) {
      throw new AppError("Item doesn't exists", 202228);
    }

    await prisma.item.delete({
      where: {
        id: item_id,
      },
    });
  }
}

export { DeleteItemByIDUseCase };
