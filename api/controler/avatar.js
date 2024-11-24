import {v4 as uuid} from 'uuid';
import {saveAvatar} from "../model/avatar.js";
import * as personModel from "../model/person.js";
import {pool} from "../database/dbAccess.js";
import {deleteFile} from "../utils/utils.js";

const destFolderAvatar = "./upload/avatar";

export const addAvatar = async (req, res) => {
    try{
        const avatar = req.files?.avatar[0];
        if (avatar !== undefined) {
            let imageName = uuid();
            await personModel.updatePerson(pool, {personId: req.body.personId, profilePicture: imageName});
            await saveAvatar(avatar.buffer, imageName, destFolderAvatar);
            res.sendStatus(201);
        } else{
            res.sendStatus(400);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const deleteAvatar = async (req, res) => {
    try{
        let person = await personModel.readPerson(pool, req.body);
        console.log(person);
        if (person?.profile_picture !== undefined) {
            await personModel.updatePerson(pool, {personId: req.body.personId, profilePicture: null});
            await deleteFile(`${destFolderAvatar}/${person?.profile_picture}.jpeg`);
            res.sendStatus(204);
        }
        else{
            console.error("No profile picture found for this user");
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
    }
}
