import React from "react";
import { Link, useLocation } from "react-router-dom";
// import Register from "./Register";

function PopupAuth(props) {

  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";

  return (

    <div className={`auth popup_type_${props.name}`}>
      <div className="auth__container">
        <form className={`auth__form`} name={`authform-${props.name}`} onSubmit={props.onSubmit}>
          <h2 className={`auth__title ${props.isError && "popup__title_position_error-info"}`} >{props.title}</h2>

          {props.children}

          <button className="button__submit button__submit_disabled button_theme_dark auth__button" type="submit" >
            {props.isLoad ? props.loadText : props.buttonText}
            {props.isLoad ? <div className='loader loader_theme_dark'></div> : ''}</button>

          {isSignUpPage && <Link to="/signin" className="auth__link">Уже зарегистрированы? Войти</Link>}


        </form>
      </div>
    </div>

  )
}

export default PopupAuth;
