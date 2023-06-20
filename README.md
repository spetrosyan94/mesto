# Проект: Mesto

## Описание проекта.
------
Отличительная черта данного проекта, что к странице подключен Java Script код, позволяющий добавить функционалу страницы новые функции, такие как добавление всплывающей Popup-формы и возможности изменения и ввода данных на странице.

Проект написан в ходе образовательной работы на [Яндекс Практикуме](https://practicum.yandex.ru/).

**GitHub**

------
* [Ссылка проекта Mesto на GitHub Pages](https://spetrosyan94.github.io/mesto)
## В проекте используются различные технологии.
------
 Проект основан на файловой структуре *БЭМ-Nested* методологии.
 Используется Java Script для возможности добавления Popup окна и большей интерактивности страницы.
 Страница имеет отзывчивый дизайн, что предполагает резиновую верстку и адаптивность под десктопные и мобильные разрешения экрана.

Реализован процесс добавления новых карточек на страницу через Java Script через модальное окно. Дополнительно реализовано функция удаления карточек, а также увеличение выбранного изображения карточки путем клика по нему.

### Процесс открытия дополнительного модального окна при выборочном клике на изображение карточки осуществлен через делегирование событий в Java Script:

```javascript
//Обработчик открытия изображения карточки в отдельный попап
cardsListElement.addEventListener("click", evt => {
  const clickedElement = evt.target;

  if (clickedElement.classList.contains("cards__image")) {
    const src = clickedElement.src;
    const name = clickedElement.alt;
    popupImageItem.src = src;
    popupImageName.textContent = name;
    noScrollToggle();
    openPopup(popupImage);
  }
});
```
### Дополнительно при открытии Popup формы отключается горизонтальный скролл:

```javascript
// Функция отключения/включения горизонтального скролла
function noScrollToggle() {
  page.classList.toggle('no-scroll');
}
```

### Также Popup окно возможно закрыть кликнув в за границы формы модального окна:

```javascript
// Обработчик прячет попап окно при клике на фон
document.addEventListener('click', function (evt) {
  const popup = evt.target.closest('.popup');
  if (popup && evt.target === popup) {
    noScrollToggle();
    closePopup(popup);
  }
});
```

 ## Планы по доработке проекта
------
