const searchFilms = (filmsData, query, checkShortFilms, checkShortFilmsSaved) => {
  let filmsFilter;
  if (query !== null && Array.isArray(filmsData)) {
    const lowerQuery = query.toLowerCase().trim();
    filmsFilter = filmsData.filter(
      (film) => 
        film.nameRU.toLowerCase().includes(lowerQuery) ||
        film.nameEN.toLowerCase().includes(lowerQuery)
    );
  }

  if (query === '') {
    filmsFilter = filmsData;
  }

  if (checkShortFilms || checkShortFilmsSaved) {
    filmsFilter = filmsFilter.filter((film) => film.duration <= 40);
  }

  return filmsFilter;
};

export { searchFilms };
