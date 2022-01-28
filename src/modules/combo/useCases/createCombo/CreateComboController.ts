import { Request, Response } from "express";
import { CreateComboUseCase } from "./CreateComboUseCase";

class CreateComboController {
  async handle(request: Request, response: Response) {
    const { id: wallet_id } = request.params;
    const { id: user_id } = request.user;
    const { name } = request.body;

    const createComboUseCase = new CreateComboUseCase();
    await createComboUseCase.execute({
      name,
      wallet_id,
      user_id,
    });

    return response.json({
      message: "Combo created!",
    });
  }
}

export { CreateComboController };
