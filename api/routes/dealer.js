import {Router} from "express";
import {createDealer, getDealer, updateDealer, deleteDealer} from "../controler/dealer.js";

const router = Router();

router.post('/', createDealer);
router.get('/:personId', getDealer);
router.patch('/', updateDealer);
router.delete('/:personId', deleteDealer);

export default router;