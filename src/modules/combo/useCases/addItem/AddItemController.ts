import { Request, Response } from "express";
import { AddItemUseCase } from "./AddItemUseCase";

class AddItemController {
  async handle(request: Request, response: Response) {
    const { item_id, amount } = request.body;
    const { id: combos_id } = request.params;
    const { id: user_id } = request.user;

    const addItemUseCase = new AddItemUseCase();

    await addItemUseCase.execute({
      amount,
      combos_id,
      item_id,
      user_id,
    });

    return response.json({
      message: "Item added on combo",
    });
  }
}

export { AddItemController };
