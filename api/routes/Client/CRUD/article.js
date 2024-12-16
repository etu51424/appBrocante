import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {default as DVM} from "../../../middleware/validator/validation/dealer.js"
import {getAllArticlesByPersonId} from "../../../controler/article.js";

const router = Router();

// récupère tous les articles d'un dealer
router.get('/:personId', jwtCheck, DVM.dealerId, getAllArticlesByPersonId);

export default router;