import React from 'react';
import 'prismjs/themes/prism-solarizedlight.css';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Header from './header';

const StyledLayout = styled.div`
  /* Constrain content. */

  margin: 0 auto;
  max-width: var(--content-width);
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

  h1 {
    text-align: center;
  }

  @media only screen and (max-width: 1068px) {
    h1 {
      font-size: 34px;
    }

    h2 {
      font-size: 28px;
    }
  }

  @media only screen and (max-width: 735px) {
    h1 {
      font-size: 28px;
    }

    h2 {
      font-size: 24px;
    }
  }

  /* Set padding for lists. */

  ul,
  dl {
    margin: 0em;
  }

  li,
  dt {
    margin-top: 0.5em;
  }

  /* Reset bullet style. */

  ul {
    list-style: none;
    padding-left: 1em;
    padding-right: 1em;
  }

  ul > li:before {
    content: '• ';
    color: var(--fg-dim-color);
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

  /* Add bullet for definitions. */

  dl {
    position: relative;
  }

  dt {
    padding-left: 1em;
    padding-right: 1em;
  }

  dt:before {
    content: '► ';
    position: absolute;
    color: var(--fg-dim-color);
    font-size: 0.47rem;
    left: 0.5em;
    top: 0.8em;
  }

  dt.rtl:before {
    content: '◄ ';
    position: absolute;
    left: calc(100% - 1.9em);
    top: 1em;
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
