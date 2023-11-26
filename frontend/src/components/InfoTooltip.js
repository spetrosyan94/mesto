import React from "react";
import InfoOk from "../images/info-tooltip-ok.svg"
import InfoError from "../images/info-tooltip-error.svg"

function InfoTooltip(props) {

  return (
    <div className={`popup  ${props.isOpen ? "transition_opened" : ''}`}>
      <div className="popup__container">
        <button className="popup__close-btn popup__close-btn_position_form" type="button" onClick={props.onClose}></button>
        <form className={`popup__form`} method="get" name="popup-infotooltip" onSubmit={props.onSubmit}>

          <img
            className="popup__image-status"
            src={props.isRegister ? InfoOk : InfoError}
            alt="Статус регистрации">
          </img>
          <h2
            className={`popup__title popup__title_info-tooltip ${props.isError && "popup__title_position_error-info"}`} >
            {props.isRegister ? props.statusText.ok : props.statusText.error}
          </h2>

        </form>
      </div>
    </div>
  )
}

export default InfoTooltip;
