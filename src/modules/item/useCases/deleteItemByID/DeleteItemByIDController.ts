import { Request, Response } from "express";
import { DeleteItemByIDUseCase } from "./DeleteItemByIDUseCase";

class DeleteItemByIDController {
  async handle(request: Request, response: Response) {
    const { id: item_id } = request.params;

    const deleteItemByIDUseCase = new DeleteItemByIDUseCase();

    await deleteItemByIDUseCase.execute(item_id);

    return response.json({
      message: "Item successfully deleted",
    });
  }
}

export { DeleteItemByIDController };
