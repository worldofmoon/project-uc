import { Router } from "express";
import userController from "./controllers/user";
import donationController from "./controllers/donation"
import { verifyAuth } from "./middlewares/user";


const router = Router();

router.use('/users', userController);
router.use('/donations', verifyAuth, donationController);

export default router;
