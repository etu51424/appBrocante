import {Router} from 'express';
import {getMap} from "../../../utils/map.js";

const router = Router();

router.get('/all', getMap); // pour récupérer toutes les brocantes [TODO]

export default router;