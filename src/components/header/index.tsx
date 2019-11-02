import * as React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

const Header: React.SFC = () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        walrusPng: file(relativePath: { eq: "walrus.png" }) {
          childImageSharp {
            fixed(width: 200, quality: 100, grayscale: true) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <header>
          <div
            style={{
              margin: '0 auto',
              width: 200,
            }}
          >
            <Link to="/">
              <Img
                fixed={data.walrusPng.childImageSharp.fixed}
                draggable={false}
                alt="Picture of a Cool Walrus"
              />
            </Link>
          </div>
        </header>
      );
    }}
  />
);

export default styled(Header)`
  display: flex;
  margin: 0 auto;
  margin-top: 1.5em;
  margin-bottom: 2em;
  padding: 1.45rem 1.0875rem;

  & a {
    text-decoration: none;
    color: var(--title-fg-color);
  }
`;
