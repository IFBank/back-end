import { Router } from "express";
import { CreateItemShopController } from "../../modules/shop/useCases/createItemShop/CreateItemShopController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const shopRoutes = Router();

const createItemShopController = new CreateItemShopController();

//POST
shopRoutes.post(
  "/create/:id",
  ensureAuthenticate,
  ensureAdmin,
  createItemShopController.handle
);

export { shopRoutes };
