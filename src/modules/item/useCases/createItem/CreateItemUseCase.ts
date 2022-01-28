import { prisma } from "../../../../database/prisma/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IItem {
  name: string;
  price: number;
  type: "DRINK" | "FOOD";
  avatar_url?: string;
}

class CreateItemUseCase {
  async execute({ name, avatar_url, price, type }: IItem) {
    if (price < 0.24) {
      throw new AppError("Price may be more then 0.25", 20223);
    }

    await prisma.item.create({
      data: {
        avatar_url,
        name,
        price,
        type,
      },
    });
  }
}

export { CreateItemUseCase };
