const popupProfileButtonOpen = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelectorAll('.popup__close-btn');
const popupCardButtonOpen = document.querySelector('.profile__add-button')
const popup = document.querySelector('.popup');
const profileAuthorText = document.querySelector('.profile__author');
const profileJobText = document.querySelector('.profile__subtitle');
const popupContainer = document.querySelector('.popup__container');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
// Находим форму в DOM
const formElementProfle = document.querySelector('.popup__form_type_profile');
const formElementCards = document.querySelector('.popup__form_type_cards');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_image-link');


// Функция открытия попапа
function openPopup(type) {
  type.classList.add('popup_opened');
}

// Функция заносит начальные данные из разметки в форму
function setPopupInputValue() {
  nameInput.value = profileAuthorText.textContent;
  jobInput.value = profileJobText.textContent;
}

// Функция вставляет текст из формы в разметку на странице
function setProfileTextValue() {
  profileAuthorText.textContent = nameInput.value;
  profileJobText.textContent = jobInput.value;
}

function setCardInputValue() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

// Функция кнопки закрытия попап
function closePopup(type) {
  type.classList.remove('popup_opened');
}

// // Обработчик прячет попап окно при клике на фон
document.addEventListener('click', function (evt) {
  const popup = evt.target.closest('.popup');
  if (popup && evt.target === popup) {
    closePopup(popup);
  }
});


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
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


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfle.addEventListener('submit', handleFormSubmit);
formElementCards.addEventListener('submit', addCardForm);

// Обработчик открытия попапа и внесения данных из разметки в инпут
popupProfileButtonOpen.addEventListener('click', function () {
  setPopupInputValue();
  openPopup(popupProfile);
});

// Обработчик открытия попапа добавления карточки и обнуления значений инпутов
popupCardButtonOpen.addEventListener('click', function () {
  setCardInputValue();
  openPopup(popupCards);
})

// // Обработчик закрытия попапа
popupButtonClose.forEach(function (element) {
  element.addEventListener('click', function () {
    closePopup(popupProfile) || closePopup(popupCards);
  });
});

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
const cardsListElement = document.querySelector('.cards');

//Функция создания карточки
function createCard({ name, link }) {
  const cardsElement = templateElement.cloneNode(true);
  const cardsText = cardsElement.querySelector('.cards__text');
  const cardsImage = cardsElement.querySelector('.cards__image');
  const cardDeleteButton = cardsElement.querySelector('.cards__delete-btn');
  cardsText.textContent = name;
  cardsImage.src = link;
  cardsImage.alt = name;

  // Функция удаления карточки
  cardDeleteButton.addEventListener('click', function () {
    cardsElement.remove();
  });

  // Вернуть новую карточку обратно
  return cardsElement;
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

// Метод проходит по всему массиву и добавляет
// новый элемент в блок Cards
initialCards.forEach(function (item) {
  renderCards(cardsListElement, item);
});

// Обработчик действия нажатия на кнопку лайк
cardsListElement.addEventListener('click', function (event) {
  if (event.target.classList.contains('cards__like-btn')) {
    event.target.classList.toggle('cards__like-btn_active');
  }
});
