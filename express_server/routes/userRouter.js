import { Router } from "express";
import userController from "../controllers/userController.js";
import userValidator from "../middleware/validateUser.js";

const router = Router();

router.get("/", userController.getUser);
router.get("/get-all", userController.getAllUser);
router.post("/", userValidator.validateCreateUser, userValidator.validateUniqueUser, userController.createUser);
router.patch("/", userValidator.validateUniqueUser, userController.updateUser);
router.delete("/", userController.deleteUser);

export default router;
