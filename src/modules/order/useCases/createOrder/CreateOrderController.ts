import { Request, Response } from "express";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

class CreateOrderController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { itens } = request.body;

    const createOrderUseCase = new CreateOrderUseCase();
    const order = await createOrderUseCase.execute({
      itens,
      user_id,
    });

    return response.json({
      name: order,
      message: "Order created!",
    });
  }
}

export { CreateOrderController };
