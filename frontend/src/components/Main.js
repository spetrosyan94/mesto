import React from 'react';
import Card from './Card.js';
import UserObjectContext from '../contexts/UserObjectContext.js';

function Main(props) {

  const userCurrent = React.useContext(UserObjectContext);

  return (
    <>
      <section className="profile">
        <div className="profile__info">
          <button className="profile__edit-avatar" type="button" value="" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={userCurrent.avatar}
              alt="Изображение аватара автора" />
            <span className="profile__edit-element"></span>
          </button>

          <div className="profile__text">
            <h1 className="profile__author">{userCurrent.name}</h1>
            <p className="profile__subtitle">{userCurrent.about}</p>
          </div>
          <button className="profile__edit-button" type="button" value="" onClick={props.onEditProfile} ></button>
        </div>
        <button className="profile__add-button" type="button" value="" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="cards">
          {/* В разметку будут добавляться карточки из JS */}
          {/* Компонент добавляющий объект карточки через итерацию массива с map */}
          {props.cards.slice().reverse().map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />))}
        </ul>
      </section>
    </>
  )
}

export default Main;
