/* eslint-disable no-useless-escape */
/* eslint-disable newline-per-chained-call */
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// Валидация ссылки с помощью регулярного выражения
const regex = /(https?:\/\/)?(www\.)?[a-z0-9-\-._~:\/?#[\]@!$&'()*+,;=]+(?:\.[a-z]{2,})+#?/i;

const urlValidity = (value, helpers) => {
  if (!regex.test(value) || !validator.isURL(value)) {
    return helpers.message('Некорректная ссылка');
  }

  return value;
};

const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidity),
  }),
});

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const getUserIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarUpdateValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidity),
  }),
});

const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(urlValidity),
  }),
});

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  signupValidate,
  signinValidate,
  getUserIdValidate,
  userUpdateValidate,
  avatarUpdateValidate,
  createCardValidate,
  cardIdValidate,
};
