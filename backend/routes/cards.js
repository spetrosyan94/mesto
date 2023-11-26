const router = require('express').Router();
const { createCardValidate, cardIdValidate } = require('../middlewares/validation');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidate, createCard);
router.delete('/:cardId', cardIdValidate, deleteCard);
router.put('/:cardId/likes', cardIdValidate, likeCard);
router.delete('/:cardId/likes', cardIdValidate, likeCard);

module.exports = router;
