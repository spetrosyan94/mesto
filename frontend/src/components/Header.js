import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header(props) {

  const [burgerButton, setIsBurgerButton] = React.useState(false);

  function handleBurgerMenu() {
    setIsBurgerButton(!burgerButton);
  }

  return (
    <header className={`header `}>

      <div className="header__menu">
        <img className="header__logo logo" src={logo} alt="логотип mesto" />
        {burgerButton && <button className="popup__close-btn popup__close-btn_position_header-menu" type="button" onClick={handleBurgerMenu} />}


        {!burgerButton && (
          <button className="burger-button" onClick={handleBurgerMenu}>
            <span className="burger-button__line"></span>
            <span className="burger-button__line"></span>
            <span className="burger-button__line"></span>
          </button>
        )}
      </div>

      <div className={`header__login ${burgerButton ? "header__login_active" : ""}`}>
        <Routes>
          <Route path="signin" element={<Link to="/signup" className="header__link" >Регистрация</Link>} />
          <Route path="signup" element={<Link to="/signin" className="header__link" >Войти</Link>} />
          <Route path="/" element={props.loggedIn &&
            <>
              <p className="header__email">{props.userEmail.email}</p>
              <button className="header__button" type="button" onClick={props.signOutUser} >Выйти</button>
            </>
          } />
        </Routes>
      </div>



    </header>
  )
}

export default Header;
