import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MainStyled from '../../components/MainStyled/MainStyled';
import CenterContainer from '../../components/CenterContainer/CenterContainer';
import Logo from '../../components/Logo/Logo';
import { loginSchema, registerSchema } from '../../utils/yup';
import ErrorField from '../../components/ErrorField/ErrorField';
import { login, registry } from '../../utils/MainApi';
import './Auth.css';

export default function Auth({ setIsLogin }) {
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(pathname === '/signin' ? loginSchema : registerSchema) });
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const onSubmit = (data) => {
    if (pathname === '/signin') {
      if (data.name) {
        delete data.name;
      }

      login(data)
        .then(() => {
          setIsLogin(true);
          localStorage.setItem('isLogin', true);
          navigate('/movies');
        })
        .catch((err) => setServerError(err));
    } else {
      registry(data)
        .then(() =>
          login({ email: data.email, password: data.password })
            .then(() => {
              setIsLogin(true);
              localStorage.setItem('isLogin', true);
              navigate('/movies');
            })
            .catch((err) => setServerError(err))
        )
        .catch((err) => setServerError(err));
    }
  };

  return (
    <>
      <MainStyled>
        <CenterContainer>
          <section className="auth" aria-label="Вход">
            <Logo />
            <h1 className="auth__title">{pathname === '/signin' ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
              {pathname === '/signup' && (
                <>
                  <label className="auth__label">
                    Имя
                    <input {...register('name')} type="text" className="auth__input" autoComplete="on" />
                  </label>
                  <ErrorField isActive={errors.name}>
                    {errors.name ? errors.name.message : 'Ошибок нет'}
                  </ErrorField>
                </>
              )}
              <label className="auth__label">
                E-mail
                <input {...register('email')} type="email" className="auth__input" autoComplete="on" />
              </label>
              <ErrorField isActive={errors.email}>
                {errors.email ? errors.email.message : 'Ошибок нет'}
              </ErrorField>
              <label className="auth__label">
                Пароль
                <input {...register('password')} type="password" className="auth__input" autoComplete="on" />
              </label>
              <ErrorField isActive={errors.password}>
                {errors.password ? errors.password.message : 'Ошибок нет'}
              </ErrorField>
              <div className="auth__buttons-wrapper">
                {serverError && <ErrorField isActive>{serverError}</ErrorField>}
                <button type="submit" disabled={!isValid} className="auth__button button">
                  {pathname === '/signin' ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <div className="auth__link-wrapper">
                  <span className="auth__question">
                    {pathname === '/signin' ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
                  </span>
                  <Link className="auth__link link" to={pathname === '/signin' ? '/signup' : '/signin'}>
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
