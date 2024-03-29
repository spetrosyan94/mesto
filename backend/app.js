const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// После этого env-переменные из файла добавятся в process.env
require('dotenv').config();

const { DB_ADDRESS } = process.env;
const { errors } = require('celebrate');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect(DB_ADDRESS);

const app = express();
// Добавляет заголовки CORS ко всем ответам сервера
app.use(cors({
  credentials: true,
  maxAge: 30, // Кэширование preFlight запросов
  origin: [
    'http://localhost:3001',
    'http://mesto.petrosyan.nomoredomainsmonster.ru',
    'https://mesto.petrosyan.nomoredomainsmonster.ru'],
}));
app.options('*', cors()); // Это обрабатывает предварительные запросы для всех маршрутов
// логгер запросов
app.use(requestLogger);
app.use(express.json()); // для собирания JSON-формата
app.use(cookieParser()); // парсер куки

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(routes);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(centralErrorHandler);

app.listen(PORT);
