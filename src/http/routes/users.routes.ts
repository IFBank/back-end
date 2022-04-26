import { Router } from "express";
import { AuthenicateUserController } from "../../modules/account/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../modules/account/useCases/createUser/CreateUserController";
import { GetUserController } from "../../modules/account/useCases/getUser/getUserController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenicateUserController();
const getUserController = new GetUserController();

// POST
usersRoutes.post("/create", createUserController.handle);
usersRoutes.post("/authenticate", authenticateUserController.handle);

// GET
usersRoutes.get("/", ensureAuthenticate, getUserController.handle);

export { usersRoutes };
