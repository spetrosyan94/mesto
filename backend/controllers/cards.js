const { ValidationError, CastError } = require('mongoose').Error;
const Card = require('../models/card');
const { STATUS_CODE } = require('../utils/constants');
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require('../errors/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }

      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Пользователю нельзя удалять карточки других пользователей.');
      }

      card.deleteOne()
        .then(() => res.status(STATUS_CODE.OK).send({ message: 'Карточка удалена.' }))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequestError('Переданы некорректные данные при удалении карточки.'));
      }

      return next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link, likes } = req.body;

  Card.create({
    name,
    link,
    likes,
    owner: req.user._id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      }

      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { _id } = req.user; // _id станет доступен
  // Тернарный оператор помогает сократить код, добавляя или удаляя лайк у карточки
  const handleLike = req.method === 'PUT' ? '$addToSet' : '$pull';

  Card.findByIdAndUpdate(
    req.params.cardId,
    { [handleLike]: { likes: _id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }

      return res.status(STATUS_CODE.OK).send(card);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      }

      return next(err);
    });
};
