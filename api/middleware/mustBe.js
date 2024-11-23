// middleware d'authorization

export const dealer = (req, res, next) => {
    if(req.session.status === 'dealer'){
        next();
    } else {
        res.sendStatus(403);
    }
}

export const admin = (req, res, next) => {
    if(req.session.status === 'admin'){
        next();
    }
    else{
        res.sendStatus(403);
    }
}

export const himself = (req, res, next) => {
    if (req.session.personId === req.val.personId){
        next();
    }
    else{
        res.sendStatus(403)
    }
}