import { Link } from 'react-router-dom';
import CenterContainer from '../CenterContainer/CenterContainer';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <CenterContainer>
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__flex-wrapper">
          <p className="footer__copyright">&copy; 2023</p>
          <nav className="footer__nav">
            <Link
              className="footer__link link"
              to="https://practicum.yandex.ru/"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
            <Link
              className="footer__link link"
              to="https://github.com/MaxGerasin"
              target="_blank"
            >
              Github
            </Link>
          </nav>
        </div>
      </CenterContainer>
    </footer>
  );
}
