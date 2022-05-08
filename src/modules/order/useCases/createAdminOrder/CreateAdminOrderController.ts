import { Request, Response } from "express";
import { CreateAdminOrderUseCase } from "./CreateAdminOrderUseCase";

class CreateAdminOrderController {
  async handle(request: Request, response: Response) {
    const { itens } = request.body;

    const createAdminOrderUseCase = new CreateAdminOrderUseCase();
    await createAdminOrderUseCase.execute(itens);

    return response.json({
      message: "Order created!",
    });
  }
}

export { CreateAdminOrderController };
