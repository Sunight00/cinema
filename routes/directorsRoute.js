const router = require('express').Router();
const directorsController = require('../controllers/directorsController');
const middleware = require('../middleware/routeErrorHandler');
const directorValidator = require('../middleware/directorValidator');

router.get('/', directorsController.getAllDirectors);
router.get('/:id', directorsController.getDirectorById);
router.post('/',middleware.isAuthenticated, directorValidator.directorRules(), directorValidator.checkDirectorData, directorsController.createDirector);
router.put('/:id',middleware.isAuthenticated,directorValidator.directorRules(), directorValidator.checkDirectorData, directorsController.updateDirector);
router.delete('/:id',middleware.isAuthenticated, directorsController.deleteDirector);

module.exports = router;