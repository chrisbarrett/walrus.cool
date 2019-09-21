import * as React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledHeader = styled.div`
  display: flex;
  background: white;
  margin-top: 1.5em;
  margin-bottom: 2em;
`;

interface Props {
  className?: string;
}

const Header: React.SFC<Props> = ({ className }) => (
  <StyledHeader className={className}>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'gray',
            textDecoration: 'none',
          }}
        >
          Gatsby + Orga
        </Link>
      </h1>
    </div>
  </StyledHeader>
);

export default Header;
