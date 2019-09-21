import * as React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledHeader = styled.div`
  display: flex;
  color: gray;
  margin: '0 auto';
  margin-top: 1.5em;
  margin-bottom: 2em;
  maxwidth: 960;
  padding: 1.45rem 1.0875rem;
`;

interface Props {
  className?: string;
}

const Header: React.SFC<Props> = ({ className }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <StyledHeader className={className}>
        <h1>
          <Link to="/" style={{ textDecoration: 'none', color: 'gray' }}>
            {data.site.siteMetadata.title}
          </Link>
        </h1>
      </StyledHeader>
    )}
  />
);

export default Header;
