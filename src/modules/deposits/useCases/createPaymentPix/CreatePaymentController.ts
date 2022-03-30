import { Request, Response } from "express";
import { CreatePaymentPixUseCase } from "./CreatePaymentPixUseCase";

class CreatePaymentController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const createPaymentPixUseCase = new CreatePaymentPixUseCase();

    const payment = createPaymentPixUseCase.execute({
      user_id,
    });

    return response.json(payment);
  }
}

export { CreatePaymentController };
