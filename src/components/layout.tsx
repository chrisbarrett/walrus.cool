import React from 'react';
import 'prismjs/themes/prism-solarizedlight.css';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Header from './header';

const StyledLayout = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;

  font-family: 'Palatino', 'Times New Roman', serif;
  line-height: 1.5;

  & .callout {
    font-size: 32pt;
    position: relative;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    border-top: 1px var(--border-color) solid;
    border-bottom: 1px var(--border-color) solid;
  }

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
