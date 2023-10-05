import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';
import Logo from '../Logo/Logo';
import { useResize } from '../../hooks/useResize';
import './Navigation.css';

export default function Navigation({ isLogin }) {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const { isLargeScreen } = useResize();

  const openBurger = () => {
    setIsOpenBurger(true);
  };

  const closeBurger = () => {
    setIsOpenBurger(false);
  };

  return (
    <>
      <nav className="header__nav">
        <Logo />
        <div className={clsx('header__options', isLogin && 'header__options_login')}>
          {isLogin ? (
            isLargeScreen && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    clsx('header__link', 'link', isActive && 'header__link_active')
                  }
                  to="/movies"
                >
                  Фильмы
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    clsx('header__link', 'link', isActive && 'header__link_active')
                  }
                  to="/saved-movies"
                >
                  Сохранённые фильмы
                </NavLink>
              </>
            )
          ) : (
            <>
              <Link className="header__link header__link_type_registry link" to="/signup">
                Регистрация
              </Link>
              <Link className="header__link header__link_type_login link" to="/signin">
                Войти
              </Link>
            </>
          )}
        </div>
        {isLogin && (
          <>
            {isLargeScreen ? (
              <Link className="header__link header__link_type_profile link" to="/profile">
                Аккаунт
              </Link>
            ) : (
              <button onClick={openBurger} type="button" className="header__button-burger button"></button>
            )}
          </>
        )}
      </nav>
      <aside className={clsx('header__overlay', isOpenBurger && 'header__overlay_active')}>
        <nav className={clsx('header__nav-mobile', isOpenBurger && 'header__nav-mobile_active')}>
          <button onClick={closeBurger} className="header__button-close button" type="button"></button>
          <ul className="header__burger-list list">
            <li>
              <NavLink
                className={({ isActive }) =>
                  clsx('header__burger-link', 'link', isActive && 'header__burger-link_active')
                }
                to="/"
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  clsx('header__burger-link', 'link', isActive && 'header__burger-link_active')
                }
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  clsx('header__burger-link', 'link', isActive && 'header__burger-link_active')
                }
                to="/saved-movies"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <Link className="header__link header__link_type_profile link" to="/profile">
            Аккаунт
          </Link>
        </nav>
      </aside>
    </>
  );
}
