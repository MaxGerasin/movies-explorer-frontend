const getResponseData = (res, errorMessage) => {
  return res.ok ? res.json() : Promise.reject(errorMessage);
};

const getFilms = async () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies').then((res) =>
    getResponseData(res, 'Во время запроса произошла ошибка.'));
};

export { getFilms };
