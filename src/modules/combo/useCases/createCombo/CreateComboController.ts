import { Request, Response } from "express";
import { CreateComboUseCase } from "./CreateComboUseCase";

class CreateComboController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { name } = request.body;

    const createComboUseCase = new CreateComboUseCase();
    const { id } = await createComboUseCase.execute({
      name,
      user_id,
    });

    return response.json({
      combo_id: id,
      message: "Combo created!",
    });
  }
}

export { CreateComboController };
