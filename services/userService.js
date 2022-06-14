const { UserRepository } = require('../repositories/userRepository');
const { ValidationError } = require("../middlewares/response.middleware");

class UserService {

    search(req,res,next) {
        const { id } = req.params;
        const item = UserRepository.getOne({id });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               (id)
        if (!item) {
            return next(ValidationError.requestError(`User with ${id} non found`));
        }
        return res.json(item);
    }

    getAllUsers(req,res) {
        const item = UserRepository.getAll();
        return res.json(item);
    }
    postUsers(req,res,next){
        const { firstName, lastName, email, phoneNumber, password } = req.body;
        if (UserRepository.getOne({email}) || UserRepository.getOne({phoneNumber}))
            return next(ValidationError.validationError(`User alredy registered with this email or phore`))

        const user = UserRepository.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        });
        return res.json(user);
    }
    putUser(req, res, next) {
        const { id } = req.params;
        const item = UserRepository.getOne({ id });
        if (!item) {
            return next(ValidationError.requestError(`User with ${id} non found`));
        }
        const data = req.body;
        const updatedUser = UserRepository.update(id, data);
        return res.json({ message: "Data is successfully updated", updatedUser });
    }
    deleteUser(req, res, next) {
        const { id } = req.params;
        const item = UserRepository.getOne({ id });
        if (!item) {
            return next(ValidationError.requestError(`User with ${id} non found`));
        }
        const deletedUser = UserRepository.delete(id);
        return res.json({ message: `User with id: ${id}  was deleted` });
    }
}

module.exports = new UserService();