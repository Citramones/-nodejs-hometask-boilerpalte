const { Router } = require('express');
const UserService = require('../services/userService');

const { responseMiddleware } = require('../middlewares/response.middleware');
const { createUserValid, updateUserValid, } = require('../middlewares/user.validation.middleware');

const router = Router();


router.get('/',UserService.getAllUsers,responseMiddleware)
router.get('/:id',UserService.search,responseMiddleware)
router.post('/',createUserValid,UserService.postUsers,responseMiddleware)
router.put('/:id',updateUserValid,UserService.putUser,responseMiddleware)
router.delete("/:id", UserService.deleteUser, responseMiddleware);

module.exports = router;