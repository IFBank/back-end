import { Router } from "express";
import { CreatePaymentController } from "../../modules/deposits/useCases/createPaymentPix/CreatePaymentController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const depositsRoutes = Router();

const createPaymentController = new CreatePaymentController();

depositsRoutes.post("/pix", ensureAuthenticate, createPaymentController.handle);

export { depositsRoutes };
