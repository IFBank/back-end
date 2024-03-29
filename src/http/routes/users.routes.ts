import { response, Router } from "express";
import { AuthenticateAdminController } from "../../modules/account/useCases/authenticateAdmin/AuthenticateAdminController";
import { AuthenicateUserController } from "../../modules/account/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../modules/account/useCases/createUser/CreateUserController";
import { GetUserController } from "../../modules/account/useCases/getUser/getUserController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenicateUserController();
const authenticateAdminController = new AuthenticateAdminController();
const getUserController = new GetUserController();

// POST
usersRoutes.post("/create", createUserController.handle);
usersRoutes.post("/authenticate", authenticateUserController.handle);
usersRoutes.post("/admin/authenticate", authenticateAdminController.handle);

// GET
usersRoutes.get("/", ensureAuthenticate, getUserController.handle);

// GET
usersRoutes.get(
  "/admin/verify",
  ensureAuthenticate,
  ensureAdmin,
  (request, response) => {
    return response.send();
  }
);

export { usersRoutes };
