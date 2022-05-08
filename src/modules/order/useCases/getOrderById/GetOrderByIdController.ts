import { Request, Response } from "express";
import { GetOrderByIdUseCase } from "./GetOrderByIdUseCase";

class GetOrderByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getOrderByIdUseCase = new GetOrderByIdUseCase();

    const order = await getOrderByIdUseCase.execute(id);

    return response.json(order);
  }
}

export { GetOrderByIdController };
