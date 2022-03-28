import { Request, Response } from "express";
import { GetOrderUseCase } from "./GetOrderUseCase";

class GetOrderController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const getOrderUseCase = new GetOrderUseCase();

    const orders = await getOrderUseCase.execute({
      user_id,
    });

    return response.json(orders);
  }
}

export { GetOrderController };
