import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import CenterContainer from '../CenterContainer/CenterContainer';
import { queryFilmsSchema } from '../../utils/yup';
import ErrorField from '../ErrorField/ErrorField';
import { getFilms } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import './SearchForm.css';

export default function SearchForm({
  handleSetFilms,
  handleCheckShortFilms,
  checkShortFilms,
  checkShortFilmsSaved,
  setIsNothingFound,
  setServerError,
  handleSetCount,
  limit,
}) {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    resolver: pathname === '/saved-movies' ? null : yupResolver(queryFilmsSchema),
  });

  const onSubmit = (data) => {
    if (pathname === '/movies') {
      setIsLoading(true);
      getFilms()
        .then((res) => {
          localStorage.setItem('films', JSON.stringify(res));
          localStorage.setItem('queryFilms', data.queryFilms);
          localStorage.setItem('isShortFilms', checkShortFilms);
        })
        .then(() => {
          handleSetFilms(data.queryFilms);
          setIsNothingFound(true);
          setIsLoading(false);
          handleSetCount(limit);
        })
        .catch((err) => {
          setServerError(err);
          setIsLoading(false);
        });
    } else {
      handleSetFilms(data.queryFilms);
      setIsNothingFound(true);
    }
  };

  useEffect(() => {
    setValue('queryFilms', pathname === '/movies' ? localStorage.getItem('queryFilms') : '');
  }, [pathname]);

  return (
    <CenterContainer>
      <section className="search-form" aria-label="Поиск по фильмам">
        <form onSubmit={handleSubmit(onSubmit)} className="search-form__form">
          <div className="search-form__search-wrapper">
            <input
              {...register('queryFilms')}
              type="text"
              className={clsx('search-form__input', errors.queryFilms && 'search-form__input_error')}
              placeholder="Фильм"
            />
            <button className="search-form__button button" />
            <ErrorField isActive={errors.queryFilms}>
              {errors.queryFilms ? errors.queryFilms.message : 'Ошибок нет'}
            </ErrorField>
          </div>
          <label className="search-form__label-tumbler">
            <input
              onChange={() => handleCheckShortFilms(getValues('queryFilms'))}
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
