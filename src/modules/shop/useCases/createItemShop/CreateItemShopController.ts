import { Request, Response } from "express";
import { CreateItemShopUseCase } from "./CreateItemShopUseCase";

class CreateItemShopController {
  async handle(request: Request, response: Response) {
    const { id: item_id } = request.params;
    const { amount } = request.body;

    const createItemShopUseCase = new CreateItemShopUseCase();

    await createItemShopUseCase.execute({
      amount,
      item_id,
    });

    return response.json({
      message: "Item added on shop!",
    });
  }
}

export { CreateItemShopController };
