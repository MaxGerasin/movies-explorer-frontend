import CenterContainer from '../CenterContainer/CenterContainer';
import './Promo.css';

export default function Promo() {
  return (
    <section className="promo" aria-label="Промо">
      <CenterContainer>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      </CenterContainer>
    </section>
  );
}
