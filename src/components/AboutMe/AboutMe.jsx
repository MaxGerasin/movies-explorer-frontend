import { Link } from 'react-router-dom';
import CenterContainer from '../CenterContainer/CenterContainer';
import Title from '../Title/Title';
import photo from '../../images/max-photo.jpg';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section id="about-me" className="about-me" aria-label="Обо мне">
      <CenterContainer>
        <Title>Студент</Title>
        <div className="about-me__flex-wrapper">
          <div className="about-me__info">
            <h3 className="about-me__name">Максим</h3>
            <p className="about-me__status">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link
              className="about-me__link link"
              to="https://github.com/MaxGerasin"
              target="_blank"
            >
              Github
            </Link>
          </div>
          <img src={photo} alt="Я на фотографии" className="about-me__photo" />
        </div>
      </CenterContainer>
    </section>
  );
}
