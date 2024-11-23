import {Router} from "express";
import {createDealer, getDealer, updateDealer, deleteDealer} from "../controler/dealer.js";
import {jwtCheck} from "../middleware/jwt.js";
import {default as DVM} from '../middleware/validator/validation/dealer.js'

const router = Router();

// j'ai ajouté un middleware authorization dealer ici
router.post('/', jwtCheck, DVM.dealerToAdd, createDealer);
router.get('/:personId', jwtCheck, DVM.dealerId, getDealer);
router.patch('/', jwtCheck, DVM.dealerToUpdate, updateDealer);
router.delete('/:personId', jwtCheck, DVM.dealerToDelete, deleteDealer);

export default router;