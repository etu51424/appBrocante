import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {default as MapVM} from "../../../middleware/validator/validation/map.js"
import {himself} from "../../../middleware/authorization/mustBe.js";
import {getAllFleaMarketsWithinRange} from "../../../controler/fleaMarket.js";

const router = Router();

router.get('/all', jwtCheck, MapVM.mapRange, himself, getAllFleaMarketsWithinRange); // pour récupérer toutes les brocantes

export default router;