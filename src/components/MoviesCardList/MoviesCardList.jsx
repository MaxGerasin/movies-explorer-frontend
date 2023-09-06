import { useResize } from '../../hooks/useResize';
import { FILMS } from '../../utils/const';
import CenterContainer from '../CenterContainer/CenterContainer';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ type }) {
  const { isMediumScreen, isSmallScreen } = useResize();
  const limit = isSmallScreen ? 5 : isMediumScreen ? 8 : 16;
  const copyFilms = FILMS.slice(0, limit);

  return (
    <section className="movies-card-list" aria-label="Карточки фильмов">
      <CenterContainer>
        <ul className="movies-card-list__list list">
          {copyFilms.map((film, id) => {
            return type !== 'save' ? (
              <li key={id}>
                <MoviesCard film={film} />
              </li>
            ) : (
              film.isLike && (
                <li key={id}>
                  <MoviesCard film={film} type={type} />
                </li>
              )
            );
          })}
        </ul>
        {type !== 'save' && (
          <button type="button" className="movies-card-list__button button">
            Ещё
          </button>
        )}
      </CenterContainer>
    </section>
  );
}
