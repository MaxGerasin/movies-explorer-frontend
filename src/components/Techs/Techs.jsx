import CenterContainer from '../CenterContainer/CenterContainer';
import Title from '../Title/Title';
import './Techs.css';

export default function Techs() {
  return (
    <section id="techs" className="techs" aria-label="Технологии">
      <CenterContainer>
        <Title>Технологии</Title>
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list list">
          <li>
            <p className="techs__list-item">HTML</p>
          </li>
          <li>
            <p className="techs__list-item">CSS</p>
          </li>
          <li>
            <p className="techs__list-item">JS</p>
          </li>
          <li>
            <p className="techs__list-item">React</p>
          </li>
          <li>
            <p className="techs__list-item">Git</p>
          </li>
          <li>
            <p className="techs__list-item">Express.js</p>
          </li>
          <li>
            <p className="techs__list-item">mongoDB</p>
          </li>
        </ul>
      </CenterContainer>
    </section>
  );
}
