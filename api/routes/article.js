import {Router} from "express";
import {getArticle} from "../controler/article.js";

const router = Router();

router.get('/:id/:dealerId', getArticle);

export default router;