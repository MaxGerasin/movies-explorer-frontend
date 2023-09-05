import CenterContainer from '../CenterContainer/CenterContainer';
import Title from '../Title/Title';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section
      id="about-project"
      className="about-project"
      aria-label="О проекте"
    >
      <CenterContainer>
        <Title>О проекте</Title>
        <ul className="about-project__list list">
          <li className="about-project__list-item">
            <h3 className="about-project__title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__list-item">
            <h3 className="about-project__title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__timeline">
          <div className="about-project__timeline-item">
            <p className="about-project__timeline-time about-project__timeline-time_type_backend">
              1 неделя
            </p>
            <p className="about-project__timeline-type-work">Back-end</p>
          </div>
          <div className="about-project__timeline-item">
            <p className="about-project__timeline-time about-project__timeline-time_type_frontend">
              4 недели
            </p>
            <p className="about-project__timeline-type-work">Front-end</p>
          </div>
        </div>
      </CenterContainer>
    </section>
  );
}
