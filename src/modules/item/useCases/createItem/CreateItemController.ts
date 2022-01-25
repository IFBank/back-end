import { Request, Response } from "express";
import { CreateItemUseCase } from "./CreateItemUseCase";

class CreateItemController {
  async handle(request: Request, response: Response) {
    const { name, avatar_url, price, type } = request.body;
    const createItemUseCase = new CreateItemUseCase();

    await createItemUseCase.execute({
      name,
      avatar_url,
      price,
      type,
    });

    return response.json({
      message: "Item created!",
    });
  }
}

export { CreateItemController };
