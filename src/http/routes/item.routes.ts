import { Router } from "express";
import { CreateItemController } from "../../modules/item/useCases/createItem/CreateItemController";
import { DeleteItemByIDController } from "../../modules/item/useCases/deleteItemByID/DeleteItemByIDController";
import { EditItemByIdController } from "../../modules/item/useCases/editItemById/EditItemByIdController";
import { GetItemByIdController } from "../../modules/item/useCases/getItemById/GetItemByIdController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const itensRoutes = Router();

const createItemController = new CreateItemController();
const deleteItemByIdController = new DeleteItemByIDController();
const getItemByIdController = new GetItemByIdController();
const editItemByIdController = new EditItemByIdController();

// POST
itensRoutes.post(
  "/create",
  ensureAuthenticate,
  ensureAdmin,
  createItemController.handle
);

// DELETE
itensRoutes.delete(
  "/admin/delete/:id",
  ensureAuthenticate,
  ensureAdmin,
  deleteItemByIdController.handle
);

// GET
itensRoutes.get(
  "/admin/get/:id",
  ensureAuthenticate,
  ensureAdmin,
  getItemByIdController.handle
);

// PUT
itensRoutes.put(
  "/admin/edit/:id",
  ensureAuthenticate,
  ensureAdmin,
  editItemByIdController.handle
);

export { itensRoutes };
