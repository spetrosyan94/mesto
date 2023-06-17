const popupButtonOpen = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const profileAuthorText = document.querySelector('.profile__author');
const profileJobText = document.querySelector('.profile__subtitle');
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

// Функция открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
  // функция открытия заносит сразу же данные строк в форму
  nameInput.value = profileAuthorText.textContent;
  jobInput.value = profileJobText.textContent;
}

// Функция кнопки закрытия попап
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // openPopup();

  profileAuthorText.textContent = nameInput.value;
  profileJobText.textContent = jobInput.value;

  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


popupButtonOpen.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);



//Массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const templateElement = document.querySelector('#cards-item-template').content.querySelector('.cards__item');
// const buttonSumbitElement = document.querySelector('.')
const cardsListElement = document.querySelector('.cards');

//Функция создания карточки
function createCard({ name, link }) {
  const cardsElement = templateElement.cloneNode(true);
  const cardsText = cardsElement.querySelector('.cards__text');
  const cardsImage = cardsElement.querySelector('.cards__image');
  cardsText.textContent = name;
  cardsImage.src = link;
  cardsImage.alt = name;
  // Вернуть скопированный и измененный массив обратно
  return cardsElement;
}

// Функция добавления карточки в DOM
function renderCards(container, data) {
  container.append(createCard(data));
}

// Метод проходит по всему массиву и добавляет
// новый элемент в блок Cards
initialCards.forEach(function (item) {
  renderCards(cardsListElement, item);
});



// Функция действия нажатия на кнопку лайк
const likeButtons = document.querySelectorAll('.cards__like-btn');

likeButtons.forEach(function (element) {
  element.addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like-btn_active');
  });
});
