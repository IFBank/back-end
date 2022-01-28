import { Router } from "express";
import { AddItemController } from "../../modules/combo/useCases/addItem/AddItemController";
import { CreateComboController } from "../../modules/combo/useCases/createCombo/CreateComboController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const combosRoutes = Router();

const createComboController = new CreateComboController();
const addItemController = new AddItemController();

// POST
combosRoutes.post(
  "/create/:id",
  ensureAuthenticate,
  createComboController.handle
);

combosRoutes.post("/add/:id", ensureAuthenticate, addItemController.handle);

export { combosRoutes };
