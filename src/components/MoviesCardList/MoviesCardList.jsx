import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CenterContainer from '../CenterContainer/CenterContainer';
import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorField from '../ErrorField/ErrorField';
import './MoviesCardList.css';

export default function MoviesCardList({
  filmsSavedSearch,
  filmsSaved,
  films,
  isNothingFound,
  serverError,
  handleSetCount,
  count,
  limit,
  onIsLikedChanged,
  errorMessage
}) {


  const [filmsLimit, setFilmsLimit] = useState([]);
  const [isLastCardsRow, setIsLastCardsRow] = useState(false);
  const { pathname } = useLocation();

  const getMoreFilms = () => {
    handleSetCount(count + limit);
  };

  const findLastCardsRow = () => {
    if (count >= films.length) {
      setIsLastCardsRow(true);
    } else {
      setIsLastCardsRow(false);
    }
  };

  const renderCards = () => {
      setFilmsLimit(films.slice(0, count));
      findLastCardsRow();
  };

  const handleLikedFilm = (film) => {
    return filmsSaved.find(movie => movie.movieId === film.id);
  }

  useEffect(() => {
    renderCards();
  }, [count]);

  useEffect(() => {
    renderCards();
  }, [films]);

  return (
    <section className="movies-card-list" aria-label="Карточки фильмов">
      <CenterContainer>
        {serverError && <ErrorField>{serverError}</ErrorField>}
        {pathname === '/movies' && !!filmsLimit.length && (
          <>
            <ul className="movies-card-list__list list">
              {filmsLimit.map((film) => (
                <li key={film.id}>
                  <MoviesCard
                    film={film}
                    onIsLikedChanged={onIsLikedChanged}
                    isLiked={handleLikedFilm(film)}
                  />
                </li>
              ))}
            </ul>
            {pathname === '/movies' && !isLastCardsRow && (
              <button onClick={getMoreFilms} type="button"
                      className="movies-card-list__button button">
                Ещё
              </button>
            )}
          </>
        )}
        {pathname === '/movies' && !filmsLimit.length && (
          <p
            className="movies-card-list__text-nothing">{isNothingFound ? 'Ничего не найдено' : 'Нужно ввести ключевое слово'}</p>
        )}
        {pathname === '/saved-movies' && (
          <ul className="movies-card-list__list list">
            {!!filmsSavedSearch.length
              ? filmsSavedSearch.map((film) => (
                <li key={film.movieId}>
                  <MoviesCard film={film} errorMessage={errorMessage} onIsLikedChanged={onIsLikedChanged} />
                </li>
              ))
              : !isNothingFound &&
              filmsSaved.map((film) => (
                <li key={film.movieId}>
                  <MoviesCard film={film} errorMessage={errorMessage} onIsLikedChanged={onIsLikedChanged} />
                </li>
              ))}
          </ul>
        )}
        {pathname === '/saved-movies' && !filmsSavedSearch.length && (
          <p className="movies-card-list__text-nothing">{isNothingFound ? 'Ничего не найдено' : 'Нет сохраненных фильмов'}</p>
        )}
      </CenterContainer>
    </section>
  );
}
