import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { ra_token, ra, name, email, password } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    await createUserUseCase.execute({
      email,
      name,
      password,
      ra,
      ra_token,
    });

    return response.json({
      message: "User created!",
    });
  }
}

export { CreateUserController };
