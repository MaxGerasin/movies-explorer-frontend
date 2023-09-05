import Header from '../../components/Header/Header';
import MainStyled from '../../components/MainStyled/MainStyled';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

export default function Movies() {
  return (
    <>
      <Header isLogin />

      <MainStyled>
        <SearchForm />
        <MoviesCardList />
      </MainStyled>

      <Footer />
    </>
  );
}
