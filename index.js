let open_popup_btn = document.querySelector('.profile__edit-button');
let close_popup_btn = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');

open_popup_btn.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

function close_popup() {
  popup.classList.remove('popup_opened');
  // При закрытии popup введенные новые строки в поля формы не сохранятся
  nameInput.value = document.querySelector('.profile__author').textContent;
  jobInput.value = document.querySelector('.profile__subtitle').textContent;
}

close_popup_btn.addEventListener('click', close_popup);

// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');

// Передаем начальные значения текста в меню popup, чтобы строка при открытии не была пустой
nameInput.value = document.querySelector('.profile__author').textContent;
jobInput.value = document.querySelector('.profile__subtitle').textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  document.querySelector('.profile__author').textContent = nameInput.value;
  document.querySelector('.profile__subtitle').textContent = jobInput.value;

  close_popup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


// Функция действия нажатия на кнопку лайк
// let like_btn = document.querySelectorAll('.elements__like-btn');

// function like_elements() {
//   like_btn.classList.toggle('elements__like-btn_active');
// }

// like_btn.addEventListener('click', like_elements);
