import {v4 as uuid} from 'uuid';
import {saveAvatar} from "../model/avatar.js";

const destFolderAvatar = "./upload/avatar";

export const addAvatar = async (req, res) => {
    const avatar = req.files?.avatar[0];
    console.log(req.body);
    if(avatar === undefined){
        res.sendStatus(400);
    } else {
        try {
            await saveAvatar(avatar.buffer, uuid(), destFolderAvatar);
            res.sendStatus(201);
        }
        catch(err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
};
