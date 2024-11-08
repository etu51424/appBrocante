import {Router} from "express";
import {getFleaMarket} from "../controler/fleaMarket.js";

const router = Router();

router.get('/:id', getFleaMarket);

export default router;