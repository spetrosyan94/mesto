import { BASE_URL } from "./constants.js";

// Получение ответа от сервера в виде объекта, вернется либо успешный ответ от сервера,
// либо обработанный объект с ошибкой, который перейдет в блок catch
export function onResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(`Что-то пошло не так: ${res.status}. ${err.message}`));
}

// Функция регистрации пользователя
export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(onResponse)
}

// Функция авторизации пользователя
export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(onResponse)
    .then((data) => {
      localStorage.setItem('userId', data._id);
      console.log(data._id);
      return data;
    })
}

// Функция проверки токена пользователя
export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`
    }
  })
    .then(onResponse)
}

// Функция выхода из аккаунта пользователя и удаления куки
export function signOut() {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
    }
  })
}
