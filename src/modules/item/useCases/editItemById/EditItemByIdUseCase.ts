import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IEditItem {
  item_id: string;
  name: string;
  price: number;
  avatar_url: string;
  type: "FOOD" | "DRINK";
}

class EditItemByIdUseCase {
  async execute({ avatar_url, item_id, name, price, type }: IEditItem) {
    const item = await prisma.item.findFirst({
      where: {
        id: item_id,
      },
    });

    if (!item) {
      throw new AppError("Item doesn't exists", 202229);
    }

    await prisma.item.update({
      where: {
        id: item_id,
      },
      data: {
        name,
        price,
        avatar_url,
        type,
      },
    });
  }
}

export { EditItemByIdUseCase };
