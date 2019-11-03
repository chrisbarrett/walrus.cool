import React from 'react';
import { create } from 'react-test-renderer';
import Header from './header';

describe('header', () => {
  it('matches snapshot', () => {
    const image = { width: 0, height: 0, src: '', srcSet: '' };
    const component = create(<Header fixedImage={image} />);
    expect(component).toMatchSnapshot();
  });
});
