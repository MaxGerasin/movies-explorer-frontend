
import CenterContainer from '../CenterContainer/CenterContainer';
import './NavTab.css';

export default function NavTab() {
  return (
    <section className="nav-tab" aria-label="Навигация">
      <CenterContainer>
        <nav className="nav-tab__nav">
          <ul className="nav-tab__list list">
            <li>
              <a className="nav-tab__link link" href="#about-project">
                О проекте
              </a>
            </li>
            <li>
              <a className="nav-tab__link link" href="#techs">
                Технологии
              </a>
            </li>
            <li>
              <a className="nav-tab__link link" href="#about-me">
                Студент
              </a>
            </li>
          </ul>
        </nav>
      </CenterContainer>
    </section>
  );
}
