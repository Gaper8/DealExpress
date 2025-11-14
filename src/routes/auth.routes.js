const express = require('express');
const router = express.Router();
const { registerController, loginController, profileController } = require('../controllers/auth.controller');
const { validate } = require('../middlewares/validate.middleware');
const { registerValidation, loginValidation } = require('../validators/auth.validator');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.post('/register', registerValidation, validate, registerController);
router.post('/login', loginValidation, validate, loginController);
router.get('/me', authMiddleware, profileController);

module.exports = router;