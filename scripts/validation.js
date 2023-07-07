// Если инпут невалиден, функция выводит сообщение об ошибке
// в элемент ошибки и добавляет класс невалидности
function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

// В случаев валидности инпута функция удаляет класс и очищает
// сообщение об ошибке
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

// При наступлении события ввода в инпут проверяем его валидность
function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!isInputValid) {
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  }
}

// Функция блокировки кнопки
function disabledButton(buttonElement, config) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add(config.inactiveButtonClass);
}

// Функция активации кнопки
function enableButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

// Функция проверяет валидность формы и
// меняет состояние кнопки submit
function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    disabledButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

// Вешаем обработчик события submit на каждую форму в переборе
function setEventListeners(formElement, config) {

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  // Перебираем список инпутов конкретной формы и вешаем на каждый
  // инпут обработчик события input
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    });
  });

  //Д ополнительная проверка валидности формы перед ее отправкой
  formElement.addEventListener('submit', () => {
    if (!formElement.checkValidity()) return;
  });
}

// Находим все формы, создаем массив и перебираем их
function enableValidition(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error'
};

enableValidition(config);
