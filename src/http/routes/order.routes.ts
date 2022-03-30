import { Router } from "express";
import { CreateOrderController } from "../../modules/order/useCases/createOrder/CreateOrderController";
import { GetHistoryOrderController } from "../../modules/order/useCases/getHistoryOrder/GetHistoryOrderController";
import { GetOrderController } from "../../modules/order/useCases/getOrder/GetOrderController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const getOrderController = new GetOrderController();
const getHistoryOrderController = new GetHistoryOrderController();

//POST
orderRoutes.post("/create/", ensureAuthenticate, createOrderController.handle);

orderRoutes.get("/list", ensureAuthenticate, getOrderController.handle);

// GET
orderRoutes.get(
  "/history",
  ensureAuthenticate,
  getHistoryOrderController.handle
);

export { orderRoutes };
