import {Router} from "express";
import multer from "multer";
import {createAvatar, getAvatar, deleteAvatar, updateAvatar} from "../../controler/avatar.js";
import {himself, notBanned} from "../../middleware/authorization/mustBe.js";
import {jwtCheck} from "../../middleware/identification/jwt.js";

const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 700000 // 700Ko
    },
    storage: storage
});

const router = Router();

router.post('/', upload.fields([{name: 'avatar', maxCount: 1}]), jwtCheck, notBanned, himself,createAvatar);
router.get('/me', jwtCheck, himself, getAvatar);
router.patch('/', upload.fields([{name: 'avatar', maxCount: 1}]), jwtCheck, notBanned, himself, updateAvatar);
router.delete('/',  jwtCheck, notBanned, himself, deleteAvatar);

export default router;