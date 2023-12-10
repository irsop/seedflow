// Controllers
const SeedsController = require('../controllers/SeedsController');
const Router = require('express').Router;
const router = new Router();
const passport = require('passport');

const adminMiddleware = require('../middlewares/adminMiddleware');
const { body } = require('express-validator');
const ImageService = require('../services/ImageService');

router.post('/create-seed',
	passport.authenticate('jwt', { session: false }),
	ImageService.upload('image'),
	body('seedName').not().isEmpty(),
	body('price').isFloat({ min: 0 }),
	body('description').optional().isLength({ min: 10, max: 500 }),
	body('sort').not().isEmpty(),
	body('season').not().isEmpty(),
	body('bigSeeds').isBoolean(),
	body('weight').optional().isNumeric().not().isEmpty(),
	body('count').optional().isNumeric().not().isEmpty(),
	adminMiddleware, SeedsController.create);
router.put('/update-seed',
	ImageService.upload('image'),
	body('id').not().isEmpty(),
	body('seedName').not().isEmpty(),
	body('price').isFloat({ min: 0 }),
	body('description').optional().isLength({ min: 10, max: 500 }),
	body('sort').not().isEmpty(),
	body('season').not().isEmpty(),
	body('bigSeeds').isBoolean(),
	body('weight').optional().isNumeric().not().isEmpty(),
	body('count').optional().isNumeric().not().isEmpty(),
	passport.authenticate('jwt', { session: false }), adminMiddleware, SeedsController.update);
router.post('/delete-seed', passport.authenticate('jwt', { session: false }), adminMiddleware, SeedsController.delete);
router.get('/all-seeds', passport.authenticate('jwt', { session: false }), adminMiddleware, SeedsController.all);

router.get('/get', SeedsController.get);
router.get('/get-action', SeedsController.getAction);
router.get('/get-random', SeedsController.getRandom);

module.exports = router;