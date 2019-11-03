import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';

export default () => (
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
    render={({ walrusPng }) => (
      <Header fixedImage={...walrusPng.childImageSharp.fixed} />
    )}
  />
);
