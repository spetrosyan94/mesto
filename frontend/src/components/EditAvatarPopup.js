import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  // Эффект состояния очистки инпутов при открытии попапа
  React.useEffect(() => {
    if (props.isOpen) {
      avatarRef.current.value = '';
    }
  }, [props.isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаем значение инпута со ссылкой на аватар в функцию onUpdateAvatar
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (

    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoad={props.isLoad}

      loadText='Загрузка...'
      name='edit-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'>

      <label className="popup__label">
        <input className="popup__input popup__input_type_image-link" name="avatar" type="url"
          placeholder="Ссылка на аватар" required ref={avatarRef} />
        <span id="avatar-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  )

}

export default EditAvatarPopup;


