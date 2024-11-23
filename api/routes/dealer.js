import {Router} from "express";
import {createDealer, getDealer, updateDealer, deleteDealer} from "../controler/dealer.js";

import {authBasic} from '../middleware/identification.js';
import {dealer} from '../middleware/mustBe.js';
import {default as DVM} from '../middleware/validator/validation/dealer.js'

const router = Router();

// j'ai ajouté un middleware authorization dealer ici
router.post('/', DVM.dealerToAdd, createDealer);
router.get('/:personId', DVM.dealerId, getDealer);
router.patch('/', DVM.dealerToUpdate, updateDealer);
router.delete('/:personId', DVM.dealerToDelete, deleteDealer);

export default router;