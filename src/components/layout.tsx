import React from 'react';
import Header from './header';
import 'prismjs/themes/prism-solarizedlight.css';
import styled from '@emotion/styled';

const StyledLayout = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

const Layout: React.SFC = ({ children }) => (
  <>
    <Header />
    <StyledLayout>{children}</StyledLayout>
  </>
);

export default Layout;
