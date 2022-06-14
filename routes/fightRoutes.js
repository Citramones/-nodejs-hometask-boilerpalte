const { Router } = require('express');
const FightService = require('../services/fightService');
const { createUserValid, updateUserValid } = require('../middlewares/fighter.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');


const router = Router();



module.exports = router;