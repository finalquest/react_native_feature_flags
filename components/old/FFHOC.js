import React from 'react';
import withFF from './FFConsumer';

const FFHOC = (Component, features) => {
  const FFComponent = withFF(Component);
  return props => (<FFComponent {...props} features={features} />);
};

export default FFHOC;
