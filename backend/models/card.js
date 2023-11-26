const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({

  name: {
    type: String,
    required: {
      value: true,
      message: 'Поле name является обязательным',
    },
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Указан некорректный url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('card', cardSchema);
