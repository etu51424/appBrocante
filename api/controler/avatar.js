import {v4 as uuid} from 'uuid';
import {saveAvatar} from "../model/avatar.js";
import * as personModel from "../model/person.js";
import {pool} from "../database/dbAccess.js";
import {deleteFile} from "../utils/file.js";

const destFolderAvatar = "./upload/avatar";

export const createAvatar = async (req, res) => {
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
        res.sendStatus(500);
        console.error(`Error while creating avatar : ${err.message}`);
    }
};

export const getAvatar = async (req, res) => {

}

export const updateAvatar = async (req, res) => {
    try{
        let person = await personModel.readPerson(pool, req.params);

        if (person?.profile_picture !== undefined && person?.profile_picture !== null) {
            await deleteFile(`${destFolderAvatar}/${person?.profile_picture}.jpeg`);
        }

        const avatar = req.files?.avatar[0];
        if (avatar !== undefined) {
            let imageName = uuid();
            await personModel.updatePerson(pool, {personId: req.params.personId, profilePicture: imageName});
            await saveAvatar(avatar.buffer, imageName, destFolderAvatar);
            res.sendStatus(204);
        }
        else{
            res.sendStatus(400);
        }
    } catch (err) {
        res.sendStatus(500);
        console.error(`Error while updating avatar : ${err.message}`);
    }
}

export const deleteAvatar = async (req, res) => {
    try{
        let person = await personModel.readPerson(pool, req.params);
        if (person?.profile_picture !== undefined) {
            await personModel.updatePerson(pool, {personId: req.params.personId, profilePicture: null});
            await deleteFile(`${destFolderAvatar}/${person?.profile_picture}.jpeg`);
            res.sendStatus(204);
        }
        else{
            console.error("No profile picture found for this user");
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while deleting avatar : ${err.message}`);
    }
}
