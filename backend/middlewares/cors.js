const allowedCors = [
  'localhost:3000',
  'mesto.petrosyan.nomoredomainsmonster.ru',
  'api.mesto.petrosyan.nomoredomainsmonster.ru',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // Если это предварительный запрос (OPTIONS), добавляем нужные заголовки и завершаем обработку
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  // Проверяем, что источник запроса (origin) есть среди разрешенных
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Продолжаем обработку запроса
  next();
};
