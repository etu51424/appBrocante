import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {default as PVM} from '../../../middleware/validator/validation/person.js'
import {himself, notBanned} from "../../../middleware/authorization/mustBe.js";
import {login} from "../../../controler/client.js";
import {createPerson, getPerson, updatePerson, deletePerson} from "../../../controler/CRUD/person.js";

const router = Router();

router.post('/', PVM.personToAdd, createPerson); // pour créer son profil
router.get('/me', jwtCheck, himself, getPerson); // pour récupérer son propre profil
router.patch('/', jwtCheck, notBanned, PVM.personToUpdate, himself, updatePerson); // pour modifier son propre profil
router.delete('/', jwtCheck, notBanned, himself, deletePerson); // pour supprimer son propre profil

router.post('/login', PVM.login, login);

export default router;