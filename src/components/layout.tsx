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
    color: var(--blue);
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

  @media only screen and (max-width: var(--content-width-large)) {
    & h1 {
      font-size: 34px;
      text-align: center;
    }

    & h2 {
      font-size: 28px;
    }
  }

  @media only screen and (max-width: var(--content-width-small)) {
    & h1 {
      font-size: 28px;
      text-align: center;
    }

    & h2 {
      font-size: 24px;
    }
  }

  /* Reset bullet style. */

  ul {
    list-style: none;
    padding-left: 1em;
    padding-right: 1em;
  }

  ul > li:before {
    content: '• ';
    font-size: 0.8rem;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
    margin-right: 0em;
  }

  ul > li.rtl:before {
    margin-left: 0em;
    margin-right: -1em;
  }

  /* Work around poor browser support for text direction pseudo-selector. */

  .ltr {
    text-align: left;
  }

  .rtl {
    text-align: right;
  }

  /* Style RTL-text. */

  *:lang(fa) {
    font-size: 1.2rem;
    font-family: 'SF Pro AR', 'SF Pro Gulf', 'Palatino', 'Times New Roman',
      serif;
  }

  *:lang(fa) *:lang(en) {
    font-size: 1rem;
    font-family: 'Palatino', 'Times New Roman', serif;
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
