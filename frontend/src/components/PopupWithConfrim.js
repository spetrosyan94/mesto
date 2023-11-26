import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirm(props) {

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onDeleteCard();
  }

  return (

    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoad={props.isLoad}

      loadText='Удаление...'
      name='card-delete'
      title='Вы уверены'
      buttonText='Да'>
    </PopupWithForm>

  )
}

export default PopupWithConfirm;
