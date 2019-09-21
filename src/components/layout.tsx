import React from 'react';
import Header from './header';
import 'prismjs/themes/prism-solarizedlight.css';
import './layout.css';

const Layout: React.SFC = ({ children }) => (
  <div>
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 720,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children}
    </div>
  </div>
);

export default Layout;