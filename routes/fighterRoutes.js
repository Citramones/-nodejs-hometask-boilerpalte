const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get("/", FighterService.getAllFighters, responseMiddleware);
router.get("/:id", FighterService.searchFigter, responseMiddleware);
router.post("/", createFighterValid, FighterService.postFighter, responseMiddleware);
router.put("/:id", updateFighterValid, FighterService.updateFighter, responseMiddleware);
router.delete("/:id", FighterService.deleteFighter, responseMiddleware);

module.exports = router;