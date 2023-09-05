import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import CenterContainer from '../../components/CenterContainer/CenterContainer';
import Header from '../../components/Header/Header';
import MainStyled from '../../components/MainStyled/MainStyled';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const onDisabled = (evt) => {
    evt.preventDefault();
    setIsDisabled(!isDisabled);
  };

  return (
    <>
      <Header isLogin />

      <MainStyled>
        <section className="profile" aria-label="Профиль">
          <CenterContainer>
            <h1 className="profile__title">Привет, Максим!</h1>
            <form onSubmit={onDisabled} className="profile__form">
              <div>
                <label className={clsx('profile__label', isDisabled && 'profile__label_disabled')}>
                  <span className="profile__label-text">Имя</span>
                  <input type="text" className="profile__input" value="Максим" disabled={isDisabled} />
                </label>
                <label className={clsx('profile__label', isDisabled && 'profile__label_disabled')}>
                  <span className="profile__label-text">E-mail</span>
                  <input
                    type="text"
                    className="profile__input"
                    value="pochta@yandex.ru"
                    disabled={isDisabled}
                  />
                </label>
              </div>
              <div className="profile__button-wrapper">
                <button type="submit" className="profile__button profile__button_type_edit-save button">
                  {isDisabled ? 'Редактировать' : 'Сохранить'}
                </button>
                <button
                  onClick={() => navigate('/')}
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
    </>
  );
}
