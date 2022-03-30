import { Router } from "express";
import { CreateItemShopController } from "../../modules/shop/useCases/createItemShop/CreateItemShopController";
import { GetShopItensController } from "../../modules/shop/useCases/getShopItens/GetShopItensController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const shopRoutes = Router();

const createItemShopController = new CreateItemShopController();
const getItensShopController = new GetShopItensController();

//POST
shopRoutes.post(
  "/create/:id",
  ensureAuthenticate,
  ensureAdmin,
  createItemShopController.handle
);

//GET
shopRoutes.get("/list", ensureAuthenticate, getItensShopController.handle);

export { shopRoutes };
