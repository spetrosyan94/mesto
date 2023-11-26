import React from "react";
import PopupAuth from "./PopupAuth";

function Login(props) {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  // Получаем значения из инпутов и заносим в стейт
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, password } = formValue;
    props.onLogin(email, password);
  }

  return (

    <PopupAuth
      onSubmit={handleSubmit}
      isLoad={props.isLoad}

      loadText='Вход...'
      name='sign-in'
      title='Вход'
      buttonText='Войти'>

      <label className="auth__label">
        <input className="auth__input" name="email" type="email" minLength="2" maxLength="40"
          required placeholder="Email" value={formValue.email} onChange={handleChange} />
        <span id="Email-error" className="auth__error"></span>
      </label>

      <label className="auth__label">
        <input className="auth__input" name="password" type="password" placeholder="Пароль"
          minLength="2" maxLength="200" required value={formValue.password} onChange={handleChange} />
        <span id="Password-error" className="auth__error"></span>
      </label>

    </PopupAuth>
  )

}

export default Login;
