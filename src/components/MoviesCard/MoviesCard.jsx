import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import './MoviesCard.css';

const MoviesCard = memo(({ film, isLiked, onIsLikedChanged, errorMessage }) => {
  const { pathname } = useLocation();
  const { image, nameRU, duration, trailerLink, } =
    film;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const like = () => {
    onIsLikedChanged(film);
  };

  return (
    <article className="movies-card">
      <a className="movies-card__link link" href={trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          src={pathname === '/saved-movies' ? image : `https://api.nomoreparties.co${image.url}`}
          alt={nameRU}

        />
      </a>
      <div className="movies-card__container-info">
        <div className="movies-card__flex-wrapper">
          <h2 className="movies-card__name">{nameRU}</h2>
          {pathname === '/saved-movies' ? (
            <button onClick={like} className="movies-card__delete-button button" type="button"></button>
          ) : (
            <button onClick={like} className="movies-card__like-button button" type="button">
              <span
                className={clsx(
                  'movies-card__like-button-icon',
                  isLiked && 'movies-card__like-button-icon_active'
                )}
              ></span>
            </button>
          )}
        </div>
        <p className="movies-card__duration">
          {!!hours && `${hours}ч`} {`${minutes}м`}
        </p>
      </div>
      {errorMessage && <Modal>{errorMessage}</Modal>}
    </article>
  );
});

export default  MoviesCard;
