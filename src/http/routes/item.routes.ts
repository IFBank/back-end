import { Router } from "express";
import { CreateItemController } from "../../modules/item/useCases/createItem/CreateItemController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const itensRoutes = Router();

const createItemController = new CreateItemController();

// POST
itensRoutes.post(
  "/create",
  ensureAuthenticate,
  ensureAdmin,
  createItemController.handle
);

export { itensRoutes };
