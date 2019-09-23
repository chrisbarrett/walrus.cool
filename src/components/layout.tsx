import React from 'react';
import Header from './header';
import 'prismjs/themes/prism-solarizedlight.css';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';

const StyledLayout = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;

  & .callout {
    font-size: 32pt;
    position: relative;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    text-align: center;
    border-top: 1px var(--border-color) solid;
    border-bottom: 1px var(--border-color) solid;
  }

  & .footnote::before {
    content: '[' attr(data-label) ']';
    display: inline-block;
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
