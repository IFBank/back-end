import { Request, Response } from "express";
import { GetHistoryOrderUseCase } from "./GetHistoryOrderUseCase";

class GetHistoryOrderController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const getHistoryOrderUseCase = new GetHistoryOrderUseCase();

    const history = await getHistoryOrderUseCase.execute({
      user_id,
    });

    return response.json(history);
  }
}

export { GetHistoryOrderController };
