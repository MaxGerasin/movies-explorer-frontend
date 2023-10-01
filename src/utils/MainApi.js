import { URL } from './const';

const getResponseData = (res, errorMessage) => {
  return res.ok ? res.json() : Promise.reject(errorMessage);
};

const addFilmSaved = async (data) => {
  return fetch(`${URL}/movies`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then((res) =>
    getResponseData(res, 'При добавлении в сохраненные фильм произошла ошибка.')
  );
};

const removeFilmSaved = async (id) => {
  return fetch(`${URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) =>
    getResponseData(res, 'При удалении из сохраненных фильмов произошла ошибка')
  );
};

const getFilms = async () => {
  return fetch(`${URL}/movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => getResponseData(res, 'Не удалось получить список фильмов'));
};

const registry = async (data) => {
  return fetch(`${URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then((res) => getResponseData(res, 'При регистрации произошла ошибка.'));
};

const login = async (data) => {
  return fetch(`${URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then((res) => getResponseData(res, 'При авторизации произошла ошибка.'));
};

const logout = async () => {
  return fetch(`${URL}/signout`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => getResponseData(res, 'Не удалось выйти из вашего аккаунта'));
};

const getUserInfo = async () => {
  return fetch(`${URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => getResponseData(res, 'Не удалось получить информацию о пользователе'));
};

const updateUserInfo = async (data) => {
  return fetch(`${URL}/users/me`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then((res) => getResponseData(res, 'Не удалось обновить информацию о пользователе'));
};

export {
  addFilmSaved,
  removeFilmSaved,
  getFilms,
  registry,
  login,
  logout,
  getUserInfo,
  updateUserInfo,
};
