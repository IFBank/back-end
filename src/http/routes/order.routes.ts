import { Router } from "express";
import { CreateAdminOrderController } from "../../modules/order/useCases/createAdminOrder/CreateAdminOrderController";
import { CreateOrderController } from "../../modules/order/useCases/createOrder/CreateOrderController";
import { GetHistoryOrderController } from "../../modules/order/useCases/getHistoryOrder/GetHistoryOrderController";
import { GetOrderController } from "../../modules/order/useCases/getOrder/GetOrderController";
import { GetOrderByIdController } from "../../modules/order/useCases/getOrderById/GetOrderByIdController";
import { ListAllOrdersController } from "../../modules/order/useCases/listAllOrders/ListAllOrdersController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const getOrderController = new GetOrderController();
const getHistoryOrderController = new GetHistoryOrderController();
const listAllOrdersController = new ListAllOrdersController();
const getOrderByIdController = new GetOrderByIdController();
const createAdminOrderController = new CreateAdminOrderController();

//POST
orderRoutes.post("/create/", ensureAuthenticate, createOrderController.handle);

orderRoutes.post(
  "/admin/create",
  ensureAuthenticate,
  ensureAdmin,
  createAdminOrderController.handle
);

// GET
orderRoutes.get("/list", ensureAuthenticate, getOrderController.handle);

orderRoutes.get(
  "/history",
  ensureAuthenticate,
  getHistoryOrderController.handle
);

orderRoutes.get(
  "/all",
  ensureAuthenticate,
  ensureAdmin,
  listAllOrdersController.handle
);

orderRoutes.get(
  "/:id",
  ensureAuthenticate,
  ensureAdmin,
  getOrderByIdController.handle
);

export { orderRoutes };
