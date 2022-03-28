import { Request, Response } from "express";
import { GetCombosUseCase } from "./GetCombosUseCase";

class GetCombosController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const getCombosUseCase = new GetCombosUseCase();

    const combos = await getCombosUseCase.execute({
      user_id,
    });

    return response.json(combos);
  }
}

export { GetCombosController };
