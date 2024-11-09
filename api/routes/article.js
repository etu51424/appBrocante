import {Router} from "express";
import {createArticle,getArticle, updateArticle, deleteArticle} from "../controler/article.js";

const router = Router();

router.post('/', createArticle);
router.get('/:id/:dealerId', getArticle);
router.patch('/', updateArticle);
router.delete('/:id/:dealerId', deleteArticle);

export default router;