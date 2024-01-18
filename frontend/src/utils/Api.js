import { BASE_URL } from "./constants.js";

export class Api {
  #url;
  #headers;

  constructor() {
    this.#url = BASE_URL;
    // this.#headers = config.headers;
  }

  // Получение ответа от сервера в виде объекта, вернется либо успешный ответ от сервера,
  // либо обработанный объект с ошибкой, который перейдет в блок catch
  #onResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(`Что-то пошло не так: ${res.status}. ${err.message}`));
  }

  // Запрос получения от сервера промиса данных карточек и пользователя
  getAllInfo() {
    return Promise.all([this.getUser(), this.getCardList()]);
  }

  // Возвращает массив объектов карточек с сервера
  getCardList() {
    return fetch(`${this.#url}/cards`, {
      credentials: "include",
    })
      .then(this.#onResponse)
  }

  // Запрос на сервер получения данных о пользователе
  getUser() {
    return fetch(`${this.#url}/users/me`, {
      method: 'GET',
      credentials: "include",
    })
      .then(this.#onResponse)
  }

  // Запрос удаления карточки
  removeCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: "include",
    })
      .then(this.#onResponse)
  }

  // Запрос создания новой карточки
  addCard(data) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(this.#onResponse)
  }

  // Запрос редактирования данных о пользователе
  editUser(data) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this.#onResponse)
  }


  // Запрос лайка или отмены постановки лайка
  changeLike(cardId, isLiked) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(this.#onResponse)
  }

  editAvatar(data) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(this.#onResponse)
  }

}

// Экземпляр класса для взаимодействия с сервером
export const api = new Api();
