import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  // Эффект состояния очистки инпутов при открытии попапа
  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen])

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link
    });
  }

  return (

    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoad={props.isLoad}

      loadText='Создание карточки...'
      name='cards'
      title='Новое место'
      buttonText='Создать'>

      <label className="popup__label">
        <input className="popup__input popup__input_type_card-name" name="name" type="text" placeholder="Название"
          minLength="2" maxLength="30" required value={name} onChange={handleChangeName} />
        <span id="name-error" className="popup__error"></span>
      </label>

      <label className="popup__label">
        <input className="popup__input popup__input_type_image-link" name="link" type="url"
          placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink} />
        <span id="link-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
