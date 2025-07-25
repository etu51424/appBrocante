import * as personValidator from '../schemas/person.js'

const personValidatorMiddleware = {
    personId : async (req, res, next) => {
        try {
            req.val = await personValidator.personId.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },

    personToSearch: async (req, res, next) => {
        try{
            const args = await personValidator.personToSearch.validate(req.query);
            req.val.username = args.username;
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },

    personToAdd : async (req, res, next) => {
        try{
            req.val = await personValidator.personToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    personToUpdate: async (req, res, next) => {
        try{
            req.val = await personValidator.personToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    login : async (req, res, next) =>{
      try{
          req.val = await personValidator.login.validate(req.body);
          next();
      }  catch (e){
          res.status(400).send(e.messages);
      }
    }
};

export default personValidatorMiddleware;