import { Request, Response } from "express";
import { ChangeStockItemUseCase } from "./ChangeStockItemUseCase";

class ChangeStockItemController {
  async handle(request: Request, response: Response) {
    const { id: item_id } = request.params;
    const { amount } = request.body;

    const changeStockItemUseCase = new ChangeStockItemUseCase();
    await changeStockItemUseCase.execute({
      item_id,
      amount,
    });

    return response.json({
      message: "Item changed stock in shop",
    });
  }
}

export { ChangeStockItemController };
