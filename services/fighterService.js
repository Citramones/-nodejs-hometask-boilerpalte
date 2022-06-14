const { FighterRepository } = require('../repositories/fighterRepository');
const { ValidationError } = require("../middlewares/response.middleware");

class FighterService {

    searchFigter(req, res, next) {
        const { id } = req.params;
        const item = FighterRepository.getOne({ id });
        if (!item) {
            return next(ValidationError.requestError(`User with ${id} non found`));
        }
        return res.json(item);
    }
    getAllFighters(req, res) {
        const fighters = FighterRepository.getAll();
        return res.json(fighters);
    }

    postFighter(req, res, next) {
        const { name, health, power, defense } = req.body;
        const findByName = FighterRepository.getOne({ name });
        if (findByName) {
            return next(ValidationError.validationError("Fighter already exist"));
        }
        const fighter = FighterRepository.create({
            name,
            health,
            power,
            defense,
        });

        return res.json(fighter);
    }

    updateFighter(req, res, next) {
        const { id } = req.params;
        const data = req.body;
        const item = FighterRepository.getOne({ id });
        if (!item) {
            return next(
                ValidationError.validationError(`Fighter with this ${id}  already exist`)
            );
        }
        const updatedFighter = FighterRepository.update(id, data);
        return res.json({
            message: "Data is successfully updated",
            updatedFighter,
        });
    }

    deleteFighter(req, res, next) {
        const { id } = req.params;
        const item = FighterRepository.getOne({ id });
        if (!item) {
            return next(ValidationError.requestError(`Fighter with this ${id} not exist`));
        }
        const deletedFighter = FighterRepository.delete(id);
        return res.json({
            message: "Data is successfully deleted",
            deletedFighter,
        });
    }
}


module.exports = new FighterService();