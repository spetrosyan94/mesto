const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { ValidationError, CastError } = require('mongoose').Error;
const User = require('../models/user');
const { STATUS_CODE } = require('../utils/constants');
const {
  NotFoundError,
  BadRequestError,
  NotUniqueError,
} = require('../errors/errors');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

      // вернем токен через куки
      return res.cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7, // Срок хранения куки 7 дней
        httpOnly: true, // теперь к куки нельзя получить доступ из JS
      })
        .send({ message: 'Токен безопасно отправлен в куки через httpOnly!' });
      // .send(user);
    })
    .catch(next); // Более короткая запись catch ниже
  // .catch((err) => next(err));
};

// Очищает куки в браузере и инициирует выход пользователя из аккаунта
module.exports.signOutUser = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Пользователь вышел из аккаунта.' });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        // если такого пользователя нет,сгенерируем исключение
        throw new NotFoundError('Нет пользователя с таким id');
      }

      res.send(user);
    })
    .catch(next); // Более короткая запись catch ниже
  // .catch((err) => next(err));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next); // На сервере произошла стандартная sошибка 500
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден.');
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequestError('Передан некорректный id пользователя.'));
      }

      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashPassword) => User.create({
      name,
      about,
      avatar,
      password: hashPassword,
      email,
    }))
    .then((user) => res.status(STATUS_CODE.CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      }

      if (err.code === 11000) {
        return next(new NotUniqueError('Пользователь пытается зарегистрироваться по уже существующему в базе email.'));
      }

      return next(err);
    });
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      }

      return next(err);
    });
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ avatar: user.avatar }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      }

      return next(err);
    });
};
