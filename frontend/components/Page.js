import propTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2');
  format:('woff2');
  font-weight: normal;
  font-style: normal;
}
  html {
    --red: #d61d1d;
    --black: #2d2d2d;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --max-width: 1000px;
    --bs: 0 12px 24px 0 rgba(0, 0, 0, 0.09); 
     box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing:inherit;
  }

  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.5;
    
  }

  a {
    text-decoration: none;
    color: var(--black);

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  
`;

const InnerStyle = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem;
`;

export default function Page({ children, cool }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyle>{children}</InnerStyle>
    </div>
  );
}

Page.propTypes = {
  cool: propTypes.string,
  children: propTypes.any,
};
