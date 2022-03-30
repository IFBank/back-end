import { Request, Response } from "express";
import { GetShopItensUseCase } from "./GetShopItensUseCase";

class GetShopItensController {
  async handle(request: Request, response: Response) {
    const getShopItensUsecase = new GetShopItensUseCase();

    const itens = await getShopItensUsecase.execute();

    return response.json(itens);
  }
}

export { GetShopItensController };
