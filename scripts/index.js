const page = document.querySelector('.page');
const popups = document.querySelectorAll('.popup');
const templateElement = document.querySelector('#cards-item-template').content.querySelector('.cards__item');
const cardsListElement = document.querySelector('.cards');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelectorAll('.popup__close-btn');
const popupCardButtonOpen = document.querySelector('.profile__add-button');
const profileAuthorText = document.querySelector('.profile__author');
const profileJobText = document.querySelector('.profile__subtitle');
const popupContainer = document.querySelector('.popup__container');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
const popupImage = document.querySelector('.popup_type_image');
// Находим форму в DOM
const formElementProfile = document.querySelector('.popup__form_type_profile');
const formElementCards = document.querySelector('.popup__form_type_cards');
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_image-link');
const cardsImage = document.querySelectorAll('.cards__image');
const popupImageItem = document.querySelector('.popup__image-item');
const popupImageName = document.querySelector('.popup__image-title');
//Строка используется для сброса значения переменной
// currentPopup после закрытия попапа
let currentPopup = null;

// const inputElement = document.querySelector('.popup__input');
// const errorElement = document.querySelector(`#${inputElement.name}-error`);
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

// Функция открытия попапа
function openPopup(type) {
  type.classList.add('transition_opened');
  noScrollToggle();
  // Переменной currentPopup присваивается ссылка на текущий открытый попап
  currentPopup = type;
  // Обработчик события закрытия попапа на клавишу Esc
  document.addEventListener('keydown', closeByEscape);
  // Очситка инпутов выбранной формы от ошибок при открытии попапа
  findFormAndHideErrorNew(currentPopup);
}

// Функция кнопки закрытия попапа
function closePopup(type) {
  type.classList.remove('transition_opened');
  noScrollToggle();
  // При закрытии попапа ссылка переменной currentPopup сбрасывается
  currentPopup = null;
  // Удаление обработчика события закрытия попапа на клавишу Esc
  document.removeEventListener('keydown', closeByEscape);
}

// Коллбэк функция закрытия попапа на клавишу Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape' && currentPopup !== null) {
    closePopup(currentPopup);
  }
}

// Функция отключения/включения горизонтального скролла
function noScrollToggle() {
  page.classList.toggle('no-scroll');
}

// Функция заносит начальные данные из разметки в форму
function setPopupInputValue() {
  const buttonSubmit = formElementProfile.querySelector('.popup__submit-btn');
  nameInput.value = profileAuthorText.textContent;
  jobInput.value = profileJobText.textContent;
  enableButton(buttonSubmit, config);
}

// Функция вставляет текст из формы в разметку на странице
function setProfileTextValue() {
  profileAuthorText.textContent = nameInput.value;
  profileJobText.textContent = jobInput.value;
}

// Функция обнуления инпутов формы добавления карточки при открытии
function clearCardFormInputs() {
  cardNameInput.form.reset();
  cardLinkInput.form.reset();
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function changeProfileInfoFormSubmit(evt) {
  evt.preventDefault();
  setProfileTextValue();
  closePopup(popupProfile);
}
// Обработчик формы для добавления новой карточки
function addCardForm(evt) {
  evt.preventDefault();
  const nameNewCard = cardNameInput.value;
  const LinkNewCard = cardLinkInput.value;
  renderCards(cardsListElement, { name: nameNewCard, link: LinkNewCard }, 'prepend');
  closePopup(popupCards);

}

//Функция создания карточки
function createCard({ name, link }) {
  const cardElement = templateElement.cloneNode(true);
  const cardText = cardElement.querySelector('.cards__text');
  const cardImage = cardElement.querySelector('.cards__image');
  const cardDeleteButton = cardElement.querySelector('.cards__delete-btn');
  cardText.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Функция удаления карточки
  cardDeleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  // Вернуть новую карточку обратно
  return cardElement;
}

// Функция добавления карточки в DOM
function renderCards(container, data, position = 'append') {
  switch (position) {
    case 'append':
      container.append(createCard(data));
      break;
    case 'prepend':
      container.prepend(createCard(data));
      break;
    default:
      break;
  }
}

// Функция в выбранной форме очищает сообщение об ошибке,
// которое остаётся после закрытия попапа с невалидными инпутами
function findFormAndHideErrorNew(currentPopup) {
  const inputs = currentPopup.querySelectorAll('.popup__input');

  inputs.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });
  const errors = currentPopup.querySelectorAll('.popup__error');

  errors.forEach((error) => {
    error.textContent = '';
  });
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', changeProfileInfoFormSubmit);
formElementCards.addEventListener('submit', addCardForm);

// Обработчик открытия попапа и внесения данных из разметки в инпут
popupProfileButtonOpen.addEventListener('click', function () {
  setPopupInputValue();
  openPopup(popupProfile);
});

// Обработчик открытия попапа добавления карточки и обнуления значений инпутов
popupCardButtonOpen.addEventListener('click', function () {
  const buttonSubmit = formElementCards.querySelector('.popup__submit-btn');
  clearCardFormInputs();
  openPopup(popupCards);
  disabledButton(buttonSubmit, config);
});

// Проходит по всем попапам и закрывает попап, если клик произошел
// на кнопке закрытия или за пределами попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
})

// Метод проходит по всему массиву и добавляет
// новый элемент в блок Cards
initialCards.forEach(function (item) {
  renderCards(cardsListElement, item);
});

// Обработчик действия нажатия на кнопку лайк
cardsListElement.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('cards__like-btn')) {
    evt.target.classList.toggle('cards__like-btn_active');
  }
});

//Обработчик открытия изображения карточки в отдельный попап
cardsListElement.addEventListener('click', evt => {
  const clickedElement = evt.target;

  if (clickedElement.classList.contains('cards__image')) {
    const src = clickedElement.src;
    const name = clickedElement.alt;
    popupImageItem.src = src;
    popupImageItem.alt = name;
    popupImageName.textContent = name;
    openPopup(popupImage);
  }
});
