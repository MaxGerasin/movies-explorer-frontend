import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import MainStyled from '../../components/MainStyled/MainStyled';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import Footer from '../../components/Footer/Footer';
import { useResize } from '../../hooks/useResize';
import { searchFilms } from '../../utils/utils';
import { getFilms } from '../../utils/MoviesApi';


export default function Movies({
  saveFilm,
  deleteFilm,
  filmsSaved,
  errorMessage
}) {
  const [films, setFilms] = useState([]);
  const allMovies = JSON.parse(localStorage.getItem('films')) ?? [];
  const [checkShortFilms, setCheckShortFilms] = useState(
    JSON.parse(localStorage.getItem('isShortFilms')) || false
  );
  const [checkShortFilmsSaved, setCheckShortFilmsSaved] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [serverError, setServerError] = useState('');
  const [filmsSavedSearch, setFilmsSavedSearch] = useState([]);
  const { isMediumScreen, isLargeScreen } = useResize();
  const limit = isLargeScreen ? 4 : isMediumScreen ? 2 : 1;
  const [queryFilmsSaved, setQueryFilmsSaved] = useState('');
  const { pathname } = useLocation();
  const [count, setCount] = useState(limit);
  const [isLoading, setIsLoading] = useState(false);

  const onIsLikedChanged = (film) => {
    if (saveFilm) {
      const savedFilm = filmsSaved.find(filmSaved => filmSaved.movieId === film.id);
      if (savedFilm) {
        deleteFilm(savedFilm.movieId);
      } else {
        saveFilm(film)
      }
    } else {
      deleteFilm(film.movieId);
      handleSetFilms(queryFilmsSaved);
    }
  };

  const handleSetCount = (count) => {
    setCount(count);
  };

  const handleSetFilms = (query) => {
    let filmsData;

    if (pathname === '/movies') {
      filmsData = JSON.parse(localStorage.getItem('films'));
      if (filmsData) {
        const searchFilmsData = searchFilms(filmsData, query, checkShortFilms, false);
        setFilms(searchFilmsData);
      }
    } else {
      filmsData = JSON.parse(localStorage.getItem('filmsSaved'));
      if (filmsData) {
        const searchFilmsData = searchFilms(filmsData, query, false, checkShortFilmsSaved);
        setQueryFilmsSaved(query);
        setFilmsSavedSearch(searchFilmsData);
      }
    }
  };

  const handleGetAllFilms = async () => {
    setIsLoading(true);
    if (!allMovies.length) {
      try {
        const films = await getFilms();
        localStorage.setItem('films', JSON.stringify(films));
        setIsLoading(false);
        setServerError('');
      } catch (err) {
        setServerError(err);
      }
    }
    setIsLoading(false);
  }

  const handleCheckShortFilms = (query) => {
    if (pathname === '/movies') {
      localStorage.setItem('queryFilms', query);
      localStorage.setItem('isShortFilms', !checkShortFilms);
      setCheckShortFilms(!checkShortFilms);
    } else {
      handleSetFilms(query);
      setQueryFilmsSaved(query);
      setCheckShortFilmsSaved(!checkShortFilmsSaved);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('queryFilms')) {
      handleSetFilms(localStorage.getItem('queryFilms') || null);
      setIsNothingFound(true);
    }
  }, [checkShortFilms]);

  useEffect(() => {
    handleSetFilms(queryFilmsSaved);
  }, [checkShortFilmsSaved]);

  useEffect(() => {
    localStorage.setItem('filmsSaved', JSON.stringify(filmsSaved));
    if (pathname === '/saved-movies') {
      handleSetFilms(queryFilmsSaved);
    }
  }, [filmsSaved]);

  useEffect(() => {
    if (pathname === '/movies') {
      const query = localStorage.getItem('queryFilms');
      if (query) {
        handleSetFilms(query);
      }
    }
    if (pathname === '/saved-movies') {
      handleSetFilms('');
    }
  }, [pathname]);

  useEffect(() => {
    if (!localStorage.getItem('films')) {
      localStorage.setItem('films', JSON.stringify([]));
    }

    if (!localStorage.getItem('filmsSaved')) {
      localStorage.setItem('filmsSaved', JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <Header isLogin />
      <MainStyled>
        <SearchForm
          handleSetFilms={handleSetFilms}
          handleCheckShortFilms={handleCheckShortFilms}
          checkShortFilms={checkShortFilms}
          checkShortFilmsSaved={checkShortFilmsSaved}
          setIsNothingFound={setIsNothingFound}
          handleSetCount={handleSetCount}
          limit={limit}
          isLoading={isLoading}
          getAllFilms={handleGetAllFilms}
        />
        <MoviesCardList
          filmsSavedSearch={filmsSavedSearch}
          setFilmsSavedSearch={setFilmsSavedSearch}
          filmsSaved={filmsSaved}
          films={films}
          setFilms={setFilms}
          isNothingFound={isNothingFound}
          serverError={serverError}
          handleSetCount={handleSetCount}
          limit={limit}
          count={count}
          onIsLikedChanged={onIsLikedChanged}
          errorMessage={errorMessage}
        />
      </MainStyled>
      <Footer />
    </>
  );
}
