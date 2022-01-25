import { Router } from "express";
import { AuthenicateUserController } from "../../modules/account/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../modules/account/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenicateUserController();

// POST
usersRoutes.post("/create", createUserController.handle);
usersRoutes.post("/authenticate", authenticateUserController.handle);

export { usersRoutes };
