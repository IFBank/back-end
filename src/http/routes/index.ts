import { Router } from "express";
import { ifmsRoutes } from "./ifms.routes";
import { itensRoutes } from "./item.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/ifms", ifmsRoutes);
router.use("/user", usersRoutes);
router.use("/item", itensRoutes);

export { router };
