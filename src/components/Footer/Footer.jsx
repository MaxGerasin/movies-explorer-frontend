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
          <ul className="footer__link">
            <li>
              <a
                className="footer__link-item link"
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
          </li>
          <li>
              <a
                className="footer__link-item link"
                href="https://github.com/MaxGerasin"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
          </li>
          </ul>
        </div>
      </CenterContainer>
    </footer>
  );
}
