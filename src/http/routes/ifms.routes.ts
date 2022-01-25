import { Router } from "express";
import { CreateIFMSController } from "../../modules/account/useCases/createIfms/CreateIFMSController";

const ifmsRoutes = Router()

const createIFMSController = new CreateIFMSController()

// POST
ifmsRoutes.post('/validate', createIFMSController.handle)

export { ifmsRoutes }