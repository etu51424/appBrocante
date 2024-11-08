import {Router} from "express";
import {getDealer} from "../controler/dealer.js";

const router = Router();

router.get('/:personId', getDealer);

export default router;