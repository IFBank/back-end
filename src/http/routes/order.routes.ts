import { Router } from "express";
import { CreateOrderController } from "../../modules/order/useCases/createOrder/CreateOrderController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const orderRoutes = Router();

const createOrderController = new CreateOrderController();

//POST
orderRoutes.post(
  "/create/:id",
  ensureAuthenticate,
  createOrderController.handle
);

export { orderRoutes };
