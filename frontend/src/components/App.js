import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { api } from '../utils/Api.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import UserObjectContext from '../contexts/UserObjectContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithConfirm from './PopupWithConfrim.js';
import ErrorPopup from './ErrorPopup.js';
import InfoTooltip from './InfoTooltip.js';
import { getLocalStorage, usePopupClose } from "../utils/utils"
import * as auth from '../utils/auth.js';

import { noScrollToggle } from '../utils/utils.js';

function App() {

  const navigate = useNavigate();

  // Определяем токен пользователя из локального хранилища браузера
  const token = getLocalStorage('userId');
  // console.log(`token ${token}`);
  // const token = { _id: '6561c7a01107bd428eb8b3c0' };
  // const token = { userId: '6561c7a01107bd428eb8b3c0' };



  // Назначение переменных состояния
  const [userCurrent, setUserCurrent] = React.useState({ name: '', about: '' });
  const [userEmail, setUserEmail] = React.useState({ _id: '', email: '' });
  const [isRegister, setIsRegister] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setIsSelectedCard] = React.useState({ name: '', link: '' });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = React.useState(false);
  const [isPopupImageOpen, setIsPopupImageOpen] = React.useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [renderLoad, setRenderLoad] = React.useState(false);

  const [errorInfo, setErrorInfo] = React.useState(null);

  // Состояние авторизован пользователь или нет
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Переменная открытого попапа
  const isOpen =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isPopupDeleteOpen ||
    isErrorPopupOpen ||
    isPopupImageOpen ||
    isErrorPopupOpen ||
    isInfoTooltip;

  const popupStatusText = {
    ok: "Вы успешно зарегистрировались!",
    error: "Что-то пошло не так! Попробуйте ещё раз."
  }

  // Эффект состояния с запросом данных пользователя и массива карточек
  // при монтированиии компонента
  React.useEffect(() => {

    if (loggedIn) {
      // Запрос получения от сервера промиса данных карточек и пользователя
      api.getAllInfo()
        .then(([dataUser, cardsArray]) => {
          setUserCurrent(dataUser);
          setCards(cardsArray);
        })
        .catch((err) => console.log(err));
    };

  }, [loggedIn]);

  // Эффект состояния при возникновении ошибки от сервера и открытии попапа с ошибкой
  React.useEffect(() => {
    if (errorInfo) {
      setIsErrorPopupOpen(true)
    }
  }, [errorInfo])

  // Эффект отключения скролла при открытом попапе
  React.useEffect(() => {
    noScrollToggle();
  }, [isOpen]);

  // Эффект проверки токена пользователя при входе на сайт
  React.useEffect(() => {
    handleTokenCheck();
  }, [token]);

  // Функция проверки токена пользователя
  function handleTokenCheck() {
    if (token) {
      auth.checkToken()
        .then((res) => {
          // console.log(`почта будет ${res.email}`);

          // здесь можем получить данные пользователя!
          setUserEmail({ email: res.email })
          // авторизуем пользователя
          setLoggedIn(true);

          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err)
          setErrorInfo(err);
        })
    } else {
      setLoggedIn(false);
    }
  }

  // Обработчик для регистрации нового пользователя
  function handleRegister(email, password) {
    setRenderLoad(true);

    auth.register(email, password)
      .then(() => {
        handleInfoTooltip();
        setIsRegister(true);
        navigate("/signin", { replace: "true" });
      })
      .catch((err) => {
        handleInfoTooltip();
        setIsRegister(false);
        console.log(err)
      })
      .finally(() => setRenderLoad(false));
  }

  // Функция управляет состоянием, что пользователь авторизован
  function handleLogin(email, password) {
    setRenderLoad(true);

    auth.authorize(email, password)
      .then(() => {
        // setFormValue({ email: "", password: "" });

        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setErrorInfo(err);
      })
      .finally(() => setRenderLoad(false));
  }

  // Функция выхода пользователя из аккаунта и удаления куки jwt
  function signOutUser() {
    setRenderLoad(true);

    auth.signOut()
      .then(() => {
        localStorage.removeItem('userId');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoad(false));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handlePopupDeleteClick(card) {
    setIsPopupDeleteOpen(true);
    // Получаем данные выбранной карточки для удаления
    setIsSelectedCard(card);
  }

  // Открытие попапа статуса при регистрации
  function handleInfoTooltip() {
    setIsInfoTooltip(true);
  }

  // Функция закрытия попапа с информацией об ошибке
  function closeErrorInfoPopup() {
    setIsErrorPopupOpen(false);
    setErrorInfo(null);
  }


  // Закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupDeleteOpen(false);
    setIsPopupImageOpen(false);
    setIsInfoTooltip(false);
    setIsSelectedCard({ name: '', link: '' });
  }

  // Закрытие попапа при клике по оверлэю или на кнопку Esc
  usePopupClose(isOpen, closeAllPopups);

  // Функция клика по картинке определенной карточке
  function handleCardClick(card) {
    setIsSelectedCard(card);
    setIsPopupImageOpen(true);
  }

  // Функция лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(like => like === userCurrent._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        console.log('Лайк поставлен/убран!');
      })
      .catch((err) => {
        console.log(err)
        setErrorInfo(err);
      });
  }

  // Функция удаления карточки
  function handleCardDelete() {
    setRenderLoad(true);

    api.removeCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => { return c._id !== selectedCard._id }));
        closeAllPopups();
        console.log('Карточка удалена!');
      })
      .catch((err) => {
        console.log(err)
        setErrorInfo(err);
      })
      .finally(() => setRenderLoad(false));
  }

  // Обработчик обновления данных профиля пользователя
  function handleUpdateUser(data) {
    setRenderLoad(true);

    api.editUser(data)
      .then((res) => {
        setUserCurrent(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
        setErrorInfo(err);
      })
      .finally(() => setRenderLoad(false));
  }

  // Обработчик редактирования аватара пользователя
  function handleUpdateAvatar(url) {
    setRenderLoad(true);

    api.editAvatar(url)
      .then((res) => {
        setUserCurrent(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
        setErrorInfo(err);
      })
      .finally(() => setRenderLoad(false));
  }

  // Обработчик создания новой карточки
  function handleAddPlaceSubmit(data) {
    setRenderLoad(true);

    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
        setErrorInfo(err);
      })
      .finally(() => setRenderLoad(false));
  }

  return (
    <>
      <UserObjectContext.Provider value={userCurrent}>
        <div className="page" >

          <Header loggedIn={loggedIn} userEmail={userEmail} signOutUser={signOutUser} />

          <main className="content">
            <Routes>

              <Route path="*" element={loggedIn === false && <Navigate to="/signin" replace />} />

              <Route
                path="/"
                element={<ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handlePopupDeleteClick}
                  cards={cards}
                />}
              />

              <Route path="/signup" element={<Register isLoad={renderLoad} onRegister={handleRegister} />} />
              <Route path="/signin" element={<Login isLoad={renderLoad} onLogin={handleLogin} />} />

            </Routes>
            /</main>

          <Footer />


          {/* Различные попапы */}
          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            isError={errorInfo}
            isLoad={renderLoad}
            isRegister={isRegister}
            statusText={popupStatusText}
          >
          </InfoTooltip>

          {/* Компонент попапа редактирования профиля */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoad={renderLoad}>
          </EditProfilePopup>

          {/* Компонент попапа редактирования аватара */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoad={renderLoad}>
          </EditAvatarPopup>

          {/* Компонент попапа добавления карточки */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoad={renderLoad}>
          </AddPlacePopup>

          {/* Компонент открытия изображения карточки */}
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard} >
          </ImagePopup>

          {/* Компонент попапа удаления карточки */}
          <PopupWithConfirm
            isOpen={isPopupDeleteOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isLoad={renderLoad}
          >
          </PopupWithConfirm>

          {/* Компонент попапа всплывающий при ошибке запроса от сервера */}
          {errorInfo &&
            <ErrorPopup
              isOpen={isErrorPopupOpen}
              onClose={closeErrorInfoPopup}
              isError={errorInfo}
              isLoad={renderLoad}>
            </ErrorPopup>}

        </div >
      </UserObjectContext.Provider >
    </>
  );
}

export default App;
