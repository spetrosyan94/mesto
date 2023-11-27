function ImagePopup(props) {

  return (
    <div className={`popup popup_type_image ${props.isOpen ? "transition_opened" : ''}`}>
      <div className="popup__image-container">

        <button className="popup__close-btn popup__close-btn_position_image" type="button" onClick={props.onClose}></button>
        <img className="popup__image-item" src={props.card?.link}
          alt={`Увеличенное изображение ${props.card?.name}`} />
        <h2 className="popup__image-title">{props.card?.name}</h2>
      </div>
    </div>
  )

}

export default ImagePopup;
