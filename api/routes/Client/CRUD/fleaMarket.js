import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {default as MapVM} from "../../../middleware/validator/validation/map.js"
import {default as DateVM} from "../../../middleware/validator/validation/dates.js"
import {himself} from "../../../middleware/authorization/mustBe.js";
import {getAllFleaMarketsBetweenDates, getAllFleaMarketsWithinRange} from "../../../controler/CRUD/fleaMarket.js";

const router = Router();

// pour récupérer toutes les brocantes dans un périmètre
router.get('/inRange', jwtCheck, MapVM.mapRange, himself, getAllFleaMarketsWithinRange);
// pour récupérer toutes les brocantes entre deux dates
router.get('/inDates', jwtCheck, DateVM.dates, getAllFleaMarketsBetweenDates);

export default router;