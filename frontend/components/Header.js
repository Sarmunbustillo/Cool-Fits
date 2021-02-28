import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

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
    align-items: center;
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
      </div>
      <div className="sub-bar">
        <p>search</p>
      </div>
      <Nav />
    </HeaderStyles>
  );
}
