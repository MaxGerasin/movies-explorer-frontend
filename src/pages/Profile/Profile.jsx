import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import CenterContainer from '../../components/CenterContainer/CenterContainer';
import MainStyled from '../../components/MainStyled/MainStyled';
import Modal from '../../components/Modal/Modal';
import { updateUserInfo } from '../../utils/MainApi';
import ErrorField from '../../components/ErrorField/ErrorField';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

export default function Profile({ exitProfile, setCurrentUser }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [serverError, setServerError] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const [isBlocked, setIsBlocked] = useState(false);

  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
  } = useFormWithValidation();

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsBlocked(true);
    } else {
      setIsBlocked(false);
    }
  }, [values]);

  const handleEdit = () => {
    setIsEdit(true);
  }

  const onEdit = (evt) => {
    evt.preventDefault();
    setIsBlocked(true);
    updateUserInfo(values)
      .then(({ name, email }) => {
        setCurrentUser({ name, email });
        setSuccessMessage('Данные обновлены');
        setIsEdit(false);
      })
      .catch((err) => {
        setServerError(err);
      })
      .finally(() => setTimeout(() => {
        setSuccessMessage('');
        setServerError('');
        setIsBlocked(false);
      }, 3000));
  };

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email })
  }, [currentUser.name, currentUser.email]);

  return (
    <>
      <Header isLogin />
      <MainStyled>
        <section className="profile" aria-label="Профиль">
          <CenterContainer>
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <form onSubmit={onEdit} className="profile__form">
              <div>
                <label className="profile__label">
                  <span className="profile__label-text">Имя</span>
                  <input
                    name='name'
                    onChange={handleChange}
                    value={values.name ?? ''}
                    type="text"
                    className="profile__input"
                    pattern='[A-Za-zА-Яа-яЁё\s\-]+'
                    required
                    minLength="2"
                    maxLength="30"
                    disabled={!isEdit}
                  />
                </label>
                <ErrorField>
                  {errors.name}
                </ErrorField>
                <label className="profile__label">
                  <span className="profile__label-text">E-mail</span>
                  <input
                    name='email'
                    onChange={handleChange}
                    value={values.email ?? ''}
                    type="email"
                    className="profile__input"
                    pattern='^[a-zA-Z0-9+_.\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,6}$'
                    required
                    disabled={!isEdit}
                  />
                </label>
                <ErrorField>
                  {errors.email}
                </ErrorField>
              </div>
              <div className="profile__button-wrapper">
                {isEdit &&
                  (<button
                    type="submit"
                    disabled={!isValid || isBlocked}
                    className="profile__button profile__button_type_save button"
                  >
                    Сохранить
                  </button>)}
                {!isEdit &&
                  (<>
                    <button
                      type="button"
                      className="profile__button profile__button_type_edit button"
                      onClick={handleEdit}
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={exitProfile}
                      type="button"
                      className="profile__button profile__button_type_logout button"
                    >
                      Выйти из аккаунта
                    </button>
                  </>
                  )}
              </div>
            </form>
          </CenterContainer>
        </section>
      </MainStyled>
      {serverError && <Modal>{serverError}</Modal>}
      {successMessage && <Modal>{successMessage}</Modal>}
    </>
  );
}
