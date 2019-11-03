import React from 'react';
import { Link } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';
import styled from '@emotion/styled';

interface Props {
  fixedImage: FixedObject;
}

const Header: React.SFC<Props> = ({ fixedImage }) => {
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
            fixed={fixedImage}
            draggable={false}
            alt="Picture of a Cool Walrus"
          />
        </Link>
      </div>
    </header>
  );
};

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
