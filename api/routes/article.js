import {Router} from "express";
import {createArticle, getArticle, getAllArticles, updateArticle, deleteArticle} from "../controler/article.js";
import {jwtCheck} from "../middleware/jwt.js";
import {default as AVM} from '../middleware/validator/validation/article.js'

const router = Router();

router.post('/', jwtCheck, AVM.articleToAdd, createArticle);

router.get('/:id', jwtCheck, AVM.articleId, getArticle);
// si la route ne précise pas l'id, tous sont affichés. 
// pas de verif de articles id car on demande tous les articles
router.get('/', jwtCheck, getAllArticles);

router.patch('/', jwtCheck, AVM.articleToUpdate, updateArticle);
router.delete('/:id', jwtCheck, AVM.articleToDelete, deleteArticle);

export default router;


/*
const req = {
    params: {}
};
const res = {
    sendStatus: (status) => {
        console.log(`Status sent: ${status}`);
    },
    send: (data) => {
        console.log(`Data sent: ${data}`);
    },
    json: (data) => {
        console.log(`JSON sent:`, data);
    },
};
*/

// Simulate calling getAllArticles
//getAllArticles(req, res);