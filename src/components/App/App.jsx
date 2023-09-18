import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import Profile from '../../pages/Profile/Profile';
import Error404 from '../../pages/Error404/Error404';
import Auth from '../../pages/Auth/Auth';
import { getUserInfo, checkToken, logout } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Modal from '../Modal/Modal';

export default function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') || false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [serverError, setServerError] = useState('');

  const getUserInfoHandler = () => {
    if (isLogin) {
      getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          setServerError(err);
        });
    }
  };

  const clearDataAccount = () => {
    localStorage.removeItem('films');
    localStorage.removeItem('queryFilms');
    localStorage.removeItem('isShortFilms');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('filmsSaved');
    setIsLogin(false);
    navigate('/');
  };

  const exitProfile = () => {
    if (pathname === '/profile') {
      logout()
        .then(() => {
          clearDataAccount();
        })
        .catch((err) => {
          setServerError(err);
        });
    } else {
      clearDataAccount();
    }
  };

  useEffect(() => {
    getUserInfoHandler();
  }, [isLogin]);

  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      checkToken()
        .then(() => { if (localStorage.getItem('isLogin') !== 'true') {
          setIsLogin(true);
        }
        })
        .catch((err) => {
          setServerError(err);
          exitProfile();
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/">
          <Route index element={<Main isLogin={isLogin} />} />
          <Route path="movies" element={<ProtectedRoute isLogin={isLogin} element={Movies} />} />
          <Route path="saved-movies" element={<ProtectedRoute isLogin={isLogin} element={Movies} />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                exitProfile={exitProfile}
                element={Profile}
              />
            }
          />
          <Route
            path="signin"
            element={isLogin && pathname === '/signin' ? navigate(-1) : <Auth setIsLogin={setIsLogin} />}
          />
          <Route
            path="signup"
            element={isLogin && pathname === '/signup' ? navigate(-1) : <Auth setIsLogin={setIsLogin} />}
          />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>

      {serverError && <Modal>{serverError}</Modal>}
    </CurrentUserContext.Provider>
  );
}
