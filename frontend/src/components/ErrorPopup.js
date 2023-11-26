import React from "react";
import PopupWithForm from "./PopupWithForm";

function ErrorPopup(props) {

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onClose();
  }

  return (

    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isError={props.isError}

      name='error-info'
      title='Возникла ошибка'
      buttonText='Клик!'>

      <p className="popup__subtitle popup__subtitle_position_error-info">{props.isError}</p>
    </PopupWithForm>
  )
}

export default ErrorPopup;
