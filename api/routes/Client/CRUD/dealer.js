import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {default as DVM} from '../../../middleware/validator/validation/dealer.js';
import {himself, notBanned} from "../../../middleware/authorization/mustBe.js";
import {createDealer} from '../../../controler/CRUD/dealer.js';

const router = Router();

router.post('/', jwtCheck, notBanned, DVM.dealerToAdd, himself, createDealer); // pour devenir un dealer


export default router;