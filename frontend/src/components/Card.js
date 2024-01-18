import React from "react";
import UserObjectContext from "../contexts/UserObjectContext";

function Card(props) {

  // Контекст объект данных пользователя
  const userCurrent = React.useContext(UserObjectContext);
  // Состояние анимации при нажатии на кнопку лайк
  const [animationLike, setAnimationLike] = React.useState(false);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === userCurrent._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((id) => { return id === userCurrent._id });
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `cards__like-btn ${isLiked && 'cards__like-btn_active'}`);

  // Обработчик состояния включения и выключения анимации у кнопки лайка
  function handleAnimationLike() {
    setAnimationLike(prevState => !prevState);
  }

  // Обработчик клика по карточке
  function handleCardClick() {
    props.onCardClick(props.card)
  }
  // Обработчик управления кнопкой лайка
  function handleLikeClick() {
    handleAnimationLike();
    props.onCardLike(props.card)
  }

  // Обработчик удаления карточки
  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (

    <li className="cards__item">
      <img className="cards__image" src={props.card.link} alt={props.card.name}
        // Обработчик клика по картинке передает объект данных выбранной карточки
        onClick={handleCardClick} />
      <div className="cards__item-container">
        <h2 className="cards__text">{props.card.name}</h2>
        <div className="cards__like">
          <button className={`${cardLikeButtonClassName} ${animationLike ? "animation__type_like" : ''}`} type="button" aria-label="Лайк"
            onClick={handleLikeClick} onAnimationEnd={handleAnimationLike}></button>
          <span className="cards__like-counter">{props.card.likes.length}</span>
        </div>
        {isOwn && <button className="cards__delete-btn" type="button" aria-label="Удалить"
          onClick={handleCardDelete}></button>}
      </div>
    </li>


  )
}

export default Card;
