import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CenterContainer from '../CenterContainer/CenterContainer';
import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorField from '../ErrorField/ErrorField';
import './MoviesCardList.css';

export default function MoviesCardList({
  filmsSavedSearch,
  setFilmsSavedSearch,
  filmsSaved,
  setFilmsSaved,
  films,
  setFilms,
  isNothingFound,
  serverError,
  handleSetCount,
  count,
  limit,
  onIsLikedChanged,
}) {
  const [filmsLimit, setFilmsLimit] = useState([]);
  const [isLastCardsRow, setIsLastCardsRow] = useState(false);
  const { pathname } = useLocation();

  const updateLikedFilm = (isLike, filmData) => {
    if (films) {
      setFilms(films.map((film) => film.id === filmData.movieId ? ({...film, isLike}) : film))
    }
    if (filmsLimit){
      setFilmsLimit(filmsLimit.map((film) => film.id === filmData.movieId ? ({...film, isLike}) : film))
    }
    if (filmsSavedSearch) {
      setFilmsSavedSearch(filmsSavedSearch.map((film) => film.id === filmData.movieId ? ({...film, isLike}) : film))
    }
    if (filmsSaved) {
      setFilmsSaved(filmsSaved.map((film) => film.id === filmData.movieId ? ({...film, isLike}) : film))
    }
  };

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

  useEffect(() => {
    renderCards();
  }, [count]);

  useEffect(() => {
    renderCards();
  }, [films]);

  return (
    <section className="movies-card-list" aria-label="Карточки фильмов">
      <CenterContainer>
        {serverError && <ErrorField isActive>{serverError}</ErrorField>}
        {pathname === '/movies' && !!filmsLimit.length && (
          <>
            <ul className="movies-card-list__list list">
              {filmsLimit.map((film) => (
                <li key={film.id}>
                  <MoviesCard film={film}  onIsLikedChanged={onIsLikedChanged}  updateLikedFilm={updateLikedFilm}/>
                </li>
              ))}
            </ul>
            {pathname === '/movies' && !isLastCardsRow && (
              <button onClick={getMoreFilms} type="button" className="movies-card-list__button button">
                Ещё
              </button>
            )}
          </>
        )}
        {pathname === '/movies' && !filmsLimit.length && isNothingFound && (
          <p className="movies-card-list__text-nothing">Ничего не найдено</p>
        )}
        {pathname === '/saved-movies' && (
          <ul className="movies-card-list__list list">
            {!!filmsSavedSearch.length
              ? filmsSavedSearch.map((film) => (
                  <li key={film.movieId}>
                    <MoviesCard film={film} isLike  onIsLikedChanged={onIsLikedChanged} updateLikedFilm={updateLikedFilm}/>
                  </li>
                ))
              : !isNothingFound &&
                filmsSaved.map((film) => (
                  <li key={film.movieId}>
                    <MoviesCard film={film} isLike  onIsLikedChanged={onIsLikedChanged} updateLikedFilm={updateLikedFilm}/>
                  </li>
                ))}
          </ul>
        )}
        {pathname === '/saved-movies' && !filmsSavedSearch.length && isNothingFound && (
          <p className="movies-card-list__text-nothing">Ничего не найдено</p>
        )}
      </CenterContainer>
    </section>
  );
}
