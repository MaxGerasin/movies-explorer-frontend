import { Link } from 'react-router-dom';
import CenterContainer from '../CenterContainer/CenterContainer';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio" aria-label="Портфолио">
      <CenterContainer>
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list list">
          <li className="portfolio__item">
            <Link
              className="portfolio__link link"
              to=" https://maxgerasin.github.io/how-to-learn/"
              target="_blank"
            >
              <h3 className="portfolio__title-work">Статичный сайт</h3>
              <span className="portfolio__icon" />
            </Link>
          </li>
          <li className="portfolio__item">
            <Link
              className="portfolio__link link"
              to="https://maxgerasin.github.io/russian-travel/"
              target="_blank"
            >
              <h3 className="portfolio__title-work">Адаптивный сайт</h3>
              <span className="portfolio__icon" />
            </Link>
          </li>
          <li className="portfolio__item">
            <Link className="portfolio__link link" to="https://mesto.maxgerasin.nomoreparties.co" target="_blank">
              <h3 className="portfolio__title-work">Одностраничное приложение</h3>
              <span className="portfolio__icon" />
            </Link>
          </li>
        </ul>
      </CenterContainer>
    </section>
  );
}
