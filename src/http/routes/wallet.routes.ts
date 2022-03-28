import { Router } from "express";
import { GetWalletMoneyController } from "../../modules/account/useCases/getWalletMoney/GetWalletMoneyController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const walletRoutes = Router();

const getWalletMoneyController = new GetWalletMoneyController();

walletRoutes.get("/money", ensureAuthenticate, getWalletMoneyController.handle);

export { walletRoutes };
