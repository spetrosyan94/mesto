import React from "react";
import PopupWithForm from "./PopupWithForm";
import UserObjectContext from "../contexts/UserObjectContext";

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const userCurrent = React.useContext(UserObjectContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(userCurrent.name);
    setDescription(userCurrent.about);
  }, [userCurrent]);

  // Очищает значения инпутов при закрытии попапа
  React.useEffect(() => {
    if (props.isOpen) {
      setName(userCurrent.name);
      setDescription(userCurrent.about);
    }
  }, [props.isOpen])

  // Функция изменения состояни имени пользователя
  function handleChangeName(evt) {
    setName(evt.target.value);
  };

  // Функция изменения состояни деятельности пользователя
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  };

  // Функция сабмита данных формы
  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description
    });

  }

  return (

    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoad={props.isLoad}

      loadText='Сохранение...'
      name='profile'
      title='Редактировать профиль'
      buttonText='Сохранить'>

      <label className="popup__label">
        <input className="popup__input popup__input_type_name" name="Username" type="text" minLength="2" maxLength="40"
          required placeholder="Ваше имя и фамилия" value={name} onChange={handleChangeName} />
        <span id="Username-error" className="popup__error"></span>
      </label>

      <label className="popup__label">
        <input className="popup__input popup__input_type_job" name="UserJob" type="text" placeholder="Ваша деятельность"
          minLength="2" maxLength="200" required value={description} onChange={handleChangeDescription} />
        <span id="UserJob-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
