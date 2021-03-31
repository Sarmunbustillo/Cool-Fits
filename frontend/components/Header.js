import Link from 'next/link';
import styled from 'styled-components';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

const Logo = styled.h1`
  background-color: var(--red);
  font-size: 4rem;
  margin-left: 2rem;
  padding: 0 0.8rem;
  transform: skew(-7deg);
  z-index: 2;
  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;

    overflow: hidden;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 2px solid var(--black, black);
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Cool Fits</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <Search />
        <Cart />
      </div>
    </HeaderStyles>
  );
}
