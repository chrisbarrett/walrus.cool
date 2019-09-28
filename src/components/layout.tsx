import React from 'react';
import 'prismjs/themes/prism-solarizedlight.css';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Header from './header';

const StyledLayout = styled.div`
  /* Constrain content. */

  margin: 0 auto;
  max-width: 720px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;

  /* Apply basic typeface settings. */

  font-family: 'Palatino', 'Times New Roman', serif;
  line-height: 1.5;

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    font-family: 'SF Pro Display', 'Helvetica Neue', 'Helvetica', 'Arial',
      sans-serif;
  }

  /* Style links to look better in both light and dark modes. */

  & a {
    color: #0070c9;
  }

  & a:link,
  & a:visited,
  a:active {
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }

  /* Dynamically resize heading elements for viewport. */

  @media only screen and (max-width: var(--viewport-width-large)) {
    & h1 {
      font-size: 34px;
      text-align: center;
    }

    & h2 {
      font-size: 28px;
    }
  }

  @media only screen and (max-width: var(--viewport-width-small)) {
    & h1 {
      font-size: 28px;
      text-align: center;
    }

    & h2 {
      font-size: 24px;
    }
  }

  /* Style RTL-text. */

  .rtl {
    text-align: right;
  }

  *:lang(fa) {
    font-size: 1.2em;
  }

  p:lang(fa) {
    font-family: 'SF Pro AR', 'SF Pro Gulf', 'Palatino', 'Times New Roman',
      serif;
  }
`;

const Layout: React.SFC = ({ children }) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>walrus.cool</title>
    </Helmet>
    <Header />
    <main>
      <StyledLayout>{children}</StyledLayout>
    </main>
  </>
);

export default Layout;
