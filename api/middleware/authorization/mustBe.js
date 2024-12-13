// middleware d'authorization

export const dealer = (req, res, next) => {
    if(req.session.status === 'dealer'){
        next();
    } else {
        res.sendStatus(403);
    }
}

export const admin = (req, res, next) => {
    if(req.session.isAdmin){
        next();
    } else{
        res.sendStatus(403);
    }
}

export const notBanned = (req, res, next) => {
    if (!req.session.isBanned){
        next();
    } else {
        res.sendStatus(403);
    }
}

export const himself = (req, res, next) => {
    if (!req.val){
        req.val = {};
    }
    req.val.personId = req.session.personId;
    next();
}