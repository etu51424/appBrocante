import {Router} from "express";
import multer from "multer";
import {addAvatar} from "../controler/avatar.js";

const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 700000 // 700Ko
    },
    storage: storage
});

const router = Router();

router.post('/add', upload.fields([{name: 'avatar', maxCount: 1}]), addAvatar);

export default router;