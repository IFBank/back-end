import { Request, Response } from "express";
import { EditItemByIdUseCase } from "./EditItemByIdUseCase";

class EditItemByIdController {
  async handle(request: Request, response: Response) {
    const { id: item_id } = request.params;
    const { name, price, avatar_url, type } = request.body;

    const editItemByIdUseCase = new EditItemByIdUseCase();
    await editItemByIdUseCase.execute({
      item_id,
      name,
      price,
      avatar_url,
      type,
    });

    return response.json({
      message: "Item successfully edited",
    });
  }
}

export { EditItemByIdController };
