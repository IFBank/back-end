import { Request, Response } from "express";
import { CreateIFMSUseCase } from "./CreateIFMSUseCase";

class CreateIFMSController {
  async handle(request: Request, response: Response) {
    const { ra, name, cpf, born_date } = request.body;
    
    const createIFMSUseCase = new CreateIFMSUseCase()
    const token_ra = await createIFMSUseCase.execute({
      ra,
      name,
      cpf,
      born_date,
    })

    return response.json({
      token_ra
    })
  }
}

export { CreateIFMSController }