import {Router} from "express";
import {default as PVM} from "../middleware/validator/validation/person.js";
import {login} from "../controler/client.js";
import {jwtCheck} from "../middleware/jwt.js";
import {himself} from "../middleware/mustBe.js";
import {getPerson} from "../controler/person.js";

const router = Router();

router.post('/login', PVM.login, login);
router.get('/me', jwtCheck, PVM.login, himself, getPerson);

export default router;