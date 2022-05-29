import { Request, Response } from "express";
import { FinishOrderByIdUseCase } from "./FInishOrderByIdUseCase";

class FinishOrderByIdController {
  async handle(request: Request, response: Response) {
    const { id: order_id } = request.params;

    const finishOrderByIdUseCase = new FinishOrderByIdUseCase();

    const order = await finishOrderByIdUseCase.execute({
      order_id,
    });

    return response.json({
      message: "Order finished success!",
    });
  }
}

export { FinishOrderByIdController };
