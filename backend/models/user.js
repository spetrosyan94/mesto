const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { UnauthorizedError } = require('../errors/errors');

const userSchema = new mongoose.Schema({
  // у пользователя есть имя — опишем требования к имени в схеме:
  name: {
    type: String, // имя — это строка
    minlength: [2, 'Минимальная длина 2 символа'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Максимальная длина 30 символов'], // а максимальная — 30 символов
    default: 'Жак-Ив Кусто', // значение по умолчанию, если данные будут undefined
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Указан некорректный URL',
    },
  },
  email: {
    type: String,
    unique: true,
    required: {
      value: true,
      message: 'Поле email является обязательным',
    },
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Указан некорректный email',
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Поле password является обязательным',
    },
    select: false, // Чтобы api не возвращал хэш пароля
  },
}, {
  versionKey: false,
});

// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email }) // this — это модель User
    .select('+password') // Возвращаем хэш пароля для аутентификации
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
