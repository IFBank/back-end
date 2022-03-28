import { Router } from "express";
import { AddItemController } from "../../modules/combo/useCases/addItem/AddItemController";
import { CreateComboController } from "../../modules/combo/useCases/createCombo/CreateComboController";
import { GetCombosController } from "../../modules/combo/useCases/getCombos/GetCombosController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const combosRoutes = Router();

const createComboController = new CreateComboController();
const addItemController = new AddItemController();
const getCombosController = new GetCombosController();

// POST
combosRoutes.post("/create", ensureAuthenticate, createComboController.handle);
combosRoutes.post("/add/:id", ensureAuthenticate, addItemController.handle);

combosRoutes.get("/list", ensureAuthenticate, getCombosController.handle);

export { combosRoutes };
