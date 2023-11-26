// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      // проверяем статус и выставляем сообщение в зависимости от него
      statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
  });
};
