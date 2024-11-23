import {readPersonWithPassword} from "../model/client.js";
import {pool} from "../database/dbAccess.js";

export const authBasic = async (req, res, next) => {
    const header = req.get('authorization');
    if(header?.includes('Basic')){
        const basicEncoded = header.split(' ')[1];
        const authString = Buffer.from(basicEncoded, 'base64').toString('utf-8');
        const [personId, password] = authString.split(':');
        const person = await readPersonWithPassword(pool, {personId, password});
        if(person.personId){
            req.session = person;
            next();
        } else {
            res.sendStatus(404);
        }
    } else {
        res.status(401).send('No basic authorization given');
    }
};