/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  const token = req.cookies.jwt;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  // if (!token) {
  //   throw new UnauthorizedError('Необходима авторизация');
  // }

  // const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось авторизовать токен
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  // записываем пейлоуд в объект запроса
  req.user = payload;
  // пропускаем запрос дальше
  next();
};
