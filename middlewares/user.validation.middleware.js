const { user } = require('../models/user');
const { ValidationError } = require('./response.middleware');
const createUserValid = (req, res, next) => {
    const body=req.body;
    for(key in user) {
        if (key === "id") continue;
        if (!body.hasOwnProperty(key)) {
            return next(ValidationError.validationError(`missing ${key}`))
        }
    }
    if (!/(.)+@gmail\.com$/g.test(body.email)) {
        return next(ValidationError.validationError(`mail mast contain @gmail.com`))};

    if (!/\+380(\d){9}$/g.test(body.email)) {
        return next(ValidationError.validationError(`only numbers in the format: +380XXXXXXXXX`));
    }
    if (body.password.length <= 2) {
        return next(ValidationError.validationError(`min 3 characters`));
    }
    next();
}





const updateUserValid = (req, res, next) => {
    const body=req.body;
    for(key in user) {
        if (body.hasOwnProperty(key)) {
            return next()
        }

    }

  return next(ValidationError.validationError(`no property to update`));
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;