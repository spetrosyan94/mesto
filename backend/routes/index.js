const router = require('express').Router();
const { createUser, login, signOutUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { signupValidate, signinValidate } = require('../middlewares/validation');

// роуты, не требующие авторизации, регистрация и логин
router.post('/signup', signupValidate, createUser);
router.post('/signin', signinValidate, login);

// авторизация
router.use(auth);

// Выход из аккаунта пользователя и удаление куки в браузере
router.get('/signout', signOutUser);

router.use('/users', require('./users'));

router.use('/cards', require('./cards'));

router.use('*', (req, res, next) => next(new NotFoundError('Ресурс не найден')));

module.exports = router;
