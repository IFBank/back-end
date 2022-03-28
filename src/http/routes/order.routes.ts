import { Router } from "express";
import { CreateOrderController } from "../../modules/order/useCases/createOrder/CreateOrderController";
import { GetOrderController } from "../../modules/order/useCases/getOrder/GetOrderController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const getOrderController = new GetOrderController();

//POST
orderRoutes.post("/create/", ensureAuthenticate, createOrderController.handle);

orderRoutes.get("/list", ensureAuthenticate, getOrderController.handle);

export { orderRoutes };
