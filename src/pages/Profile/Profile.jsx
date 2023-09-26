import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import CenterContainer from '../../components/CenterContainer/CenterContainer';
import MainStyled from '../../components/MainStyled/MainStyled';
import Modal from '../../components/Modal/Modal';
import { updateUserInfo } from '../../utils/MainApi';
import { useForm } from 'react-hook-form';
import ErrorField from '../../components/ErrorField/ErrorField';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../../utils/yup';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

export default function Profile({ exitProfile, setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [serverError, setServerError] = useState('');
  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    handleSubmit,
  formState: { errors },
} = useForm({ resolver: yupResolver(profileSchema) });

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleName = (evt) => {
    setName(evt.target.value);
  };

  const checkEdit = (currName, currEmail) => {
    if (currName !== name || currEmail !== email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onEdit = () => {
    
    updateUserInfo({ name, email })
      .then(({ name, email }) => {
        setCurrentUser({ name, email });
        checkEdit(name, email);
        setSuccessMessage('Данные обновлены');
      })
      .catch((err) => {
        setServerError(err);
      })
      .finally(() =>  setTimeout(() => {
        setSuccessMessage('');
        setServerError('');
      }, 3000));
  };

  useEffect(() => {
    checkEdit(currentUser.name, currentUser.email);
  }, [name, email]);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);

  return (
    <>
      <Header isLogin />
      <MainStyled>
        <section className="profile" aria-label="Профиль">
          <CenterContainer>
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <form onSubmit={handleSubmit(onEdit)} className="profile__form">
              <div>
                <label className="profile__label">
                  <span className="profile__label-text">Имя</span>
                  <input
                   {...register('name')}
                    onChange={handleName}
                    value={name}
                    type="text"
                    className="profile__input"
                    required
                  />
                </label>
                <ErrorField isActive={errors.name}>
                    {errors.name ? errors.name.message : 'Ошибок нет'}
                </ErrorField>
                <label className="profile__label">
                  <span className="profile__label-text">E-mail</span>
                  <input
                    {...register('email')}
                    onChange={handleEmail}
                    value={email}
                    type="email"
                    className="profile__input"
                    required
                  />
                </label>
                <ErrorField isActive={errors.email}>
                {errors.email ? errors.email.message : 'Ошибок нет'}
                </ErrorField>
              </div>
              <div className="profile__button-wrapper">
                <button
                  type="submit"
                  disabled={isDisabled}
                  className="profile__button profile__button_type_edit-save button"
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
