import { Request, Response } from "express";
import { GetWalletMoneyUseCase } from "./GetWalletMoneyUseCase";

class GetWalletMoneyController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const getWalletMoneyUseCase = new GetWalletMoneyUseCase();

    const money = await getWalletMoneyUseCase.execute({
      user_id,
    });

    return response.json({
      money,
    });
  }
}

export { GetWalletMoneyController };
