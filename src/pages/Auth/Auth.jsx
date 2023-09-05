import { Link } from 'react-router-dom';
import MainStyled from '../../components/MainStyled/MainStyled';
import CenterContainer from '../../components/CenterContainer/CenterContainer';
import Logo from '../../components/Logo/Logo';
import './Auth.css';

export default function Auth({ type }) {
  return (
    <>
      <MainStyled>
        <CenterContainer>
          <section className="auth" aria-label="Вход">
            <Logo />
            <h1 className="auth__title">{type === 'signin' ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
            <form className="auth__form">
              {type !== 'signin' && (
                <label className="auth__label">
                  Имя
                  <input type="text" className="auth__input" />
                </label>
              )}
              <label className="auth__label">
                E-mail
                <input type="email" className="auth__input" />
              </label>
              <label className="auth__label">
                Пароль
                <input type="password" className="auth__input" />
                {type !== 'signin' && <span className="auth__error">Что-то пошло не так...</span>}
              </label>
              <div className="auth__buttons-wrapper">
                <button type="submit" className="auth__button button">
                  {type === 'signin' ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <div className="auth__link-wrapper">
                  <span className="auth__question">
                    {type === 'signin' ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
                  </span>
                  <Link className="auth__link link" to={type === 'signin' ? '/signup' : '/signin'}>
                    {type === 'signin' ? 'Регистрация' : 'Войти'}
                  </Link>
                </div>
              </div>
            </form>
          </section>
        </CenterContainer>
      </MainStyled>
    </>
  );
}
