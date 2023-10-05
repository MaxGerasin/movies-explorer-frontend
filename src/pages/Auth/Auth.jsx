import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MainStyled from '../../components/MainStyled/MainStyled';
import CenterContainer from '../../components/CenterContainer/CenterContainer';
import Logo from '../../components/Logo/Logo';
import ErrorField from '../../components/ErrorField/ErrorField';
import { login, registry } from '../../utils/MainApi';
import './Auth.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

export default function Auth({ setIsLogin }) {
  const { pathname } = useLocation();
  const {
    values, handleChange, errors, isValid
  } = useFormWithValidation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const onSubmit = (evt) => {
    evt.preventDefault()
    setIsBlocked(true);
    if (pathname === '/signin') {
      if (values.name) {
        delete values.name;
      }
      login(values)
        .then(() => {
          setIsLogin(true);
          navigate('/movies');
          setServerError('');
        })
        .catch((err) => setServerError(err))
        .finally(() => setIsBlocked(false));
    } else {
      registry(values)
        .then(() => {
            login({ email: values.email, password: values.password })
              .then(() => {
                setIsLogin(true);
                navigate('/movies');
                setServerError('');
              })
              .catch((err) => setServerError(err))
              .finally(() => setIsBlocked(false));
            setServerError('');
          }
        )
        .catch((err) => setServerError(err))
        .finally(() => setIsBlocked(false));
    }
  };

  return (
    <>
      <MainStyled>
        <CenterContainer>
          <section className="auth" aria-label="Вход">
            <Logo />
            <h1
              className="auth__title">{pathname === '/signin' ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
            <form onSubmit={onSubmit} className="auth__form">
              {pathname === '/signup' && (
                <>
                  <label className="auth__label">
                    Имя
                    <input
                      name='name'
                      value={values.name ?? ''}
                      onChange={handleChange}
                      type="text"
                      className="auth__input"
                      autoComplete="on"
                      minLength="2"
                      maxLength="30"
                      pattern='[A-Za-zА-Яа-яЁё\s\-]+'
                      required
                    />
                  </label>
                  <ErrorField>
                    {errors.name ?? ''}
                  </ErrorField>
                </>
              )}
              <label className="auth__label">
                E-mail
                <input
                  name='email'
                  value={values.email ?? ''}
                  onChange={handleChange}
                  type="email"
                  className="auth__input"
                  autoComplete="on"
                  pattern='^[a-zA-Z0-9+_.\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,6}$'
                  required
                />
              </label>
              <ErrorField>
                {errors.email ?? ''}
              </ErrorField>
              <label className="auth__label">
                Пароль
                <input
                  name='password'
                  value={values.password ?? ''}
                  onChange={handleChange}
                  type="password"
                  className="auth__input"
                  autoComplete="on"
                  required
                />
              </label>
              <ErrorField>
                {errors.password ?? ''}
              </ErrorField>
              <div className="auth__buttons-wrapper">
                {serverError && <ErrorField>{serverError}</ErrorField>}
                <button type="submit" disabled={!isValid || isBlocked}
                        className="auth__button button">
                  {pathname === '/signin' ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <div className="auth__link-wrapper">
                  <span className="auth__question">
                    {pathname === '/signin' ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
                  </span>
                  <Link className="auth__link link"
                        to={pathname === '/signin' ? '/signup' : '/signin'}>
                    {pathname === '/signin' ? 'Регистрация' : 'Войти'}
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
