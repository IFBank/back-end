import { Request, Response } from "express";
import { CreatePaymentPixUseCase } from "./CreatePaymentPixUseCase";

class CreatePaymentController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { value } = request.body; //TEM QUE SER EM STRING PARA API DA GN ACEITAR

    const createPaymentPixUseCase = new CreatePaymentPixUseCase();

    const { qrcode, imagemQrcode } = await createPaymentPixUseCase.execute({
      user_id,
      value,
    });

    return response.json({
      qrCodeText: qrcode,
      qrCodeImage: imagemQrcode,
    });
  }
}

export { CreatePaymentController };
