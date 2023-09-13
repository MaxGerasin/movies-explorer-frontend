import Header from '../../components/Header/Header';
import MainStyled from '../../components/MainStyled/MainStyled';
import Promo from '../../components/Promo/Promo';
import NavTab from '../../components/NavTab/NavTab';
import AboutProject from '../../components/AboutProject/AboutProject';
import Techs from '../../components/Techs/Techs';
import AboutMe from '../../components/AboutMe/AboutMe';
import Portfolio from '../../components/Portfolio/Portfolio';
import Footer from '../../components/Footer/Footer';

export default function Main({ isLogin }) {
  return (
    <>
      <Header isLogin={isLogin} />
      <MainStyled>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </MainStyled>
      <Footer />
    </>
  );
}
