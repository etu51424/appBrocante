import {Router} from "express";
import {createDealer, getDealer, updateDealer, deleteDealer} from "../controler/dealer.js";

import {authBasic} from '../middleware/identification.js';
import {dealer} from '../middleware/mustBe.js';
import {default as DVM} from '../middleware/validator/validation/dealer.js'

const router = Router();

// j'ai ajouté un middleware authorization dealer ici
router.post('/', authBasic, dealer, DVM.dealerToAdd, createDealer);
router.get('/:personId', authBasic, dealer, DVM.dealerId, getDealer);
router.patch('/', authBasic, dealer, DVM.dealerToUpdate, updateDealer);
router.delete('/:personId', authBasic, dealer, DVM.dealerToDelete, deleteDealer);

export default router;