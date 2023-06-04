let popupButtonOpen = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let profileAuthorText = document.querySelector('.profile__author');
let profileJobText = document.querySelector('.profile__subtitle');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

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

// Функция действия нажатия на кнопку лайк
// let like_btn = document.querySelectorAll('.elements__like-btn');

// function like_elements() {
//   like_btn.classList.toggle('elements__like-btn_active');
// }

// like_btn.addEventListener('click', like_elements);
