import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import Profile from '../../pages/Profile/Profile';
import Error404 from '../../pages/Error404/Error404';
import Auth from '../../pages/Auth/Auth';
import {
  addFilmSaved,
  getFilms,
  getUserInfo,
  logout,
  removeFilmSaved
} from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Modal from '../Modal/Modal';

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [serverError, setServerError] = useState('');
  const [filmsSaved, setFilmsSaved] = useState([]);

  const getFilmsSaved = () => {
    getFilms()
      .then((films) => {
        setFilmsSaved(films);
        setServerError('');
      })
      .catch((err) => {
        setServerError(err);
      });
  };

  function saveFilm(film) {
    addFilmSaved({
      country: film.country,
      director: film.director,
      duration: film.duration,
      year: film.year,
      description: film.description,
      image: `https://api.nomoreparties.co${film.image.url}`,
      trailerLink: film.trailerLink,
      nameRU: film.nameRU,
      nameEN: film.nameEN,
      thumbnail: `https://api.nomoreparties.co${film.image.formats.thumbnail.url}`,
      movieId: film.id,
    })
      .then((film) => {
        setFilmsSaved([film, ...filmsSaved]);
        setServerError('');
      })
      .catch((err) => {
        setServerError(err);
      });
  }

  function deleteFilm(filmId) {
    const filmToDelete = filmsSaved.find(
      (movie) => filmId === movie.movieId);
    removeFilmSaved(filmToDelete._id)
      .then((deletedFilm) => {
        setFilmsSaved(filmsSaved.filter((film) => film._id !== deletedFilm._id)
        );
        setServerError('');
      })
      .catch((err) => {
        setServerError(err);
      });
  }

  const clearDataAccount = () => {
    localStorage.clear();
    setIsLogin(false);
    navigate('/');
  };

  const exitProfile = () => {
    if (pathname === '/profile') {
      logout()
        .then(() => {
          clearDataAccount();
          setServerError('');
        })
        .catch((err) => {
          setServerError(err);
        });
    } else {
      clearDataAccount();
    }
  };

  useEffect(() => {
    const currentPath = pathname;
    getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsLogin(true);
        navigate(currentPath);
      })
      .catch((err) => {
        exitProfile();
      });
  }, [isLogin])

  useEffect(() => {
    if (isLogin) {
      getFilmsSaved()
    }
  }, [isLogin])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/">
          <Route index element={<Main isLogin={isLogin} />} />
          <Route path="movies" element={<ProtectedRoute isLogin={isLogin}
                                                        saveFilm={saveFilm}
                                                        deleteFilm={deleteFilm}
                                                        filmsSaved={filmsSaved}
                                                        errorMessage={serverError}
                                                        element={Movies} />} />
          <Route path="saved-movies" element={<ProtectedRoute isLogin={isLogin}
                                                              deleteFilm={deleteFilm}
                                                              filmsSaved={filmsSaved}
                                                              errorMessage={serverError}
                                                              element={Movies} />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                exitProfile={exitProfile}
                setCurrentUser={setCurrentUser}
                element={Profile}
              />
            }
          />
          <Route
            path="signin"
            element={isLogin && pathname === '/signin' ? navigate(-1) :
              <Auth setIsLogin={setIsLogin} />}
          />
          <Route
            path="signup"
            element={isLogin && pathname === '/signup' ? navigate(-1) :
              <Auth setIsLogin={setIsLogin} />}
          />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>

      {serverError && <Modal>{serverError}</Modal>}
    </CurrentUserContext.Provider>
  );
}
