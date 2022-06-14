const { fighter } = require('../models/fighter');
const { ValidationError } = require("./response.middleware");

const createFighterValid = (req, res, next) => {
    const body = req.body;
    for (key in fighter) {
        if (key === "id") continue;
        if (!body.hasOwnProperty(key)) {
            if (key === "health") {
                req.body.key = fighter.key;
            } else {
                return next(ValidationError.validationError(`${key}`));
            }
        }
        if (body.power <= 1 || body.power >= 100) {
            return next(
                ValidationError.validationError("1<power<100 ")
            );
        }
        if (body.health <= 80 || body.health >= 120) {
            return next(
                ValidationError.validationError(
                    "80<power<120"
                )
            );
        }
        if (body.defense <= 1 || body.defense >= 10) {
            return next(
                ValidationError.validationError("1<power<10")
            );
        }
    }
    next();
};


const updateFighterValid = (req, res, next) => {

    const body = req.body;
    for (key in fighter) {
        if (body.hasOwnProperty(key)) next();
    }
    return next(ValidationError.validationError(`no property to update`));
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;