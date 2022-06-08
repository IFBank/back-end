import { Request, Response } from "express";
import { AuthenticateAdminUseCase } from "./AuthenticateAdminUseCase";

class AuthenticateAdminController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateAdminUseCase();
    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json({
      token,
    });
  }
}

export { AuthenticateAdminController };
