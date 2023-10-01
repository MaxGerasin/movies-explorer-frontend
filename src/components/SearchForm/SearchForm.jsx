import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import CenterContainer from '../CenterContainer/CenterContainer';
import ErrorField from '../ErrorField/ErrorField';
import Preloader from '../Preloader/Preloader';
import './SearchForm.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

export default function SearchForm({
  handleSetFilms,
  handleCheckShortFilms,
  checkShortFilms,
  checkShortFilmsSaved,
  setIsNothingFound,
  handleSetCount,
  limit,
  isLoading,
  getAllFilms
}) {
  const { pathname } = useLocation();

  const {
    values,
    handleChange,
    errors,
    setValues
  } = useFormWithValidation();

  const onSubmit = async (evt) => {
    evt.preventDefault()
    if (pathname === '/movies') {
      await getAllFilms();
      localStorage.setItem('queryFilms', values.queryFilms);
      localStorage.setItem('isShortFilms', checkShortFilms);
      handleSetFilms(values.queryFilms);
      setIsNothingFound(true);
      handleSetCount(limit);
    } else {
      handleSetFilms(values.queryFilms);
      setIsNothingFound(true);
    }
  };

  useEffect(() => {
    setValues({ queryFilms: pathname === '/movies' ? localStorage.getItem('queryFilms') : '' });
  }, [pathname]);

  return (
    <CenterContainer>
      <section className="search-form" aria-label="Поиск по фильмам">
        <form onSubmit={onSubmit} className="search-form__form">
          <div className="search-form__search-wrapper">
            <input
              name='queryFilms'
              onChange={handleChange}
              value={values.queryFilms ?? ''}
              type="text"
              className={clsx('search-form__input', errors.queryFilms && 'search-form__input_error')}
              placeholder="Фильм"
              required
            />
            <button className="search-form__button button" />
            <ErrorField>
              {errors.queryFilms ?? ''}
            </ErrorField>
          </div>
          <label className="search-form__label-tumbler">
            <input
              onChange={() => handleCheckShortFilms(values.queryFilms)}
              checked={pathname === '/movies' ? checkShortFilms : checkShortFilmsSaved}
              type="checkbox"
              className="search-form__tumbler"
            />
            <span className="search-form__text-tumbler">Короткометражки</span>
          </label>
        </form>
      </section>
      {isLoading && createPortal(<Preloader />, document.body)}
    </CenterContainer>
  );
}
