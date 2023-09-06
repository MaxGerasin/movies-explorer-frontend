import CenterContainer from '../CenterContainer/CenterContainer';
import Navigation from '../Navigation/Navigation';
import clsx from 'clsx';
import './Header.css';

export default function Header({ isLogin }) {
  return (
    <header className={clsx('header', isLogin && 'header_back_white')}>
      <CenterContainer>
        <Navigation isLogin={isLogin} />
      </CenterContainer>
    </header>
  );
}
