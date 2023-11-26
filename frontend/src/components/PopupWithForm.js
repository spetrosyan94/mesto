import React from "react";

function PopupWithForm(props) {

  return (

    <div className={`popup popup_type_${props.name} ${props.isOpen ? "transition_opened" : ''}`}>
      <div className="popup__container">

        <form className={`popup__form popup__form_type_${props.name}`} method="get" name={`popupform-${props.name}`} onSubmit={props.onSubmit}>
          <button className="popup__close-btn popup__close-btn_position_form" type="button" onClick={props.onClose}></button>
          <h2 className={`popup__title ${props.isError && "popup__title_position_error-info"}`} >{props.title}</h2>

          {props.children}

          <button className="button__submit button__submit_disabled" type="submit" >
            {props.isLoad ? props.loadText : props.buttonText}
            {props.isLoad ? <div className='loader'></div> : ''}</button>
        </form>
      </div>
    </div>

  )
}

export default PopupWithForm;
