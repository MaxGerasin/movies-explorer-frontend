import clsx from 'clsx';
import './MoviesCard.css';

export default function MoviesCard({ film, type }) {
  const { link, name, duration, isLike } = film;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <article className="movies-card">
      <img className="movies-card__image" src={link} alt={name} />
      <div className="movies-card__container-info">
        <div className="movies-card__flex-wrapper">
          <h2 className="movies-card__name">{name}</h2>
          {type !== 'save' ? (
            <button className="movies-card__like-button button" type="button">
              <span
                className={clsx(
                  'movies-card__like-button-icon',
                  isLike && 'movies-card__like-button-icon_active'
                )}
              ></span>
            </button>
          ) : (
            <button className="movies-card__delete-button button" type="button"></button>
          )}
        </div>
        <p className="movies-card__duration">
          {hours && `${hours}ч`} {`${minutes}м`}
        </p>
      </div>
    </article>
  );
}
