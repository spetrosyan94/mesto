import React from "react";

// Функция отключения/включения горизонтального скролла
export function noScrollToggle(openPopup) {

  openPopup
    ? document.body.classList.add('no-scroll')
    : document.body.classList.remove('no-scroll');
}

// Метод получения токена из локального хранилища браузера
export function getLocalStorage(key) {
  return localStorage.getItem(key)
}

export function usePopupClose(isOpen, closePopup) {
  React.useEffect(() => {
    // Проверяем, дейсвительно ли попап открыт. Если нет, прекращаем дальнейшие действия
    if (!isOpen) return;

    // Закрытие на клик по оверлею
    function handleOverlayClose(evt) {
      // Проверяем, если имеется такой класс, значит, кликнули на оверлей
      if (evt.target.classList.contains("popup")) {
        closePopup();
      }
    };

    // Закрытие попапа на клавишу Esc
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);

    // Очищаем обработчики после размонтирования компонента
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    }
    // Эффект проверяет, открыт ли попап при изменении его стейта состояния
  }, [isOpen, closePopup])
};
