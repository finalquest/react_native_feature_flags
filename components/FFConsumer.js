import React from 'react';
import FFContext from './FFContext';

const withFF = Component => () => (
  <FFContext.Consumer>
    {
    ({ restrictions, flag, replacement }) => (restrictions.includes(flag) ? replacement : Component)
  }
  </FFContext.Consumer>
);

export default withFF;
