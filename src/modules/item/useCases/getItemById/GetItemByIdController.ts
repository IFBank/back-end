import { Request, Response } from "express";
import { GetItemByIdUseCase } from "./GetItemByIdUseCase";

class GetItemByIdController {
  async handle(request: Request, response: Response) {
    const { id: item_id } = request.params;

    const getItemByIdUseCase = new GetItemByIdUseCase();
    const item = await getItemByIdUseCase.execute(item_id);

    return response.json(item);
  }
}

export { GetItemByIdController };
