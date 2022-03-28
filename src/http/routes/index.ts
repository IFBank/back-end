import { Router } from "express";
import { combosRoutes } from "./combo.routes";
import { ifmsRoutes } from "./ifms.routes";
import { itensRoutes } from "./item.routes";
import { orderRoutes } from "./order.routes";
import { shopRoutes } from "./shop.routes";
import { usersRoutes } from "./users.routes";
import { walletRoutes } from "./wallet.routes";

const router = Router();

router.use("/ifms", ifmsRoutes);
router.use("/user", usersRoutes);
router.use("/item", itensRoutes);
router.use("/shop", shopRoutes);
router.use("/combo", combosRoutes);
router.use("/order", orderRoutes);
router.use("/wallet", walletRoutes);

export { router };
