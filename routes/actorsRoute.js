const express = require('express');
const router = express.Router();
const actorsController = require("../controllers/actorsController");
const actorValidator = require("../middleware/actorValidator");
const middleware = require('../middleware/routeErrorHandler');

router.get("/", actorsController.getAll)
router.get("/:id", actorsController.getSingle);
router.get("/movies/:title", actorsController.getActorsByMovieTitle);
router.get("/happy/go", actorsController.h);

router.post("/",middleware.isAuthenticated , actorValidator.actorRules(),actorValidator.checkActorData, actorsController.createActor);
router.put("/:id",middleware.isAuthenticated, actorValidator.actorRules(),actorValidator.checkActorData, actorsController.updateActor);
router.delete("/:id",middleware.isAuthenticated, actorsController.deleteActor);


module.exports = router;