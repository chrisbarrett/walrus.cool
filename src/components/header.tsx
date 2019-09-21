import * as React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';

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
      <header className={className}>
        <h1>
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </h1>
      </header>
    )}
  />
);

export default styled(Header)`
  display: flex;
  margin: 0 auto;
  margin-top: 1.5em;
  margin-bottom: 2em;
  maxwidth: 960;
  padding: 1.45rem 1.0875rem;

  & a {
    text-decoration: none;
    color: var(--title-fg-color);
  }
`;
