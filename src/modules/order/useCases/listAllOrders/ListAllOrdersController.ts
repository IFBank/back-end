import { Request, Response } from "express";
import { ListAllOrdersUseCase } from "./ListAllOrdersUseCase";

class ListAllOrdersController {
  async handle(request: Request, response: Response) {
    const listAllOrdersUseCase = new ListAllOrdersUseCase();

    const orders = await listAllOrdersUseCase.execute();

    return response.json(orders);
  }
}

export { ListAllOrdersController };
