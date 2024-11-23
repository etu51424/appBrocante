import {jwt_verify} from "../utils/utils.js";
import err from "jsonwebtoken/lib/JsonWebTokenError.js";

export const jwtCheck = (req, res, next) => {
    const header = req.get('authorization');
    if(header?.includes('Bearer')){
        const jwt = header.split(' ')[1];
        try{
            req.session =  jwt_verify(jwt)
            next();
        } catch(err){
            res.status(401).send(err.message);
        }
    }
    else{
        res.status(401).send("Not valid jwt");
    }
}