import React from 'react';
import PropTypes from 'prop-types';
import withFF from './FFConsumer';

const FFAware = ({ type: Component, props: allprops }) => {
  const FFComponent = withFF(Component);
  const { children, ...props } = allprops;
  return (
    <FFComponent {...props}>
      {React.Children.map(children, el => FFAware(el))}
    </FFComponent>
  );
};


FFAware.propTypes = {
  type: PropTypes.element.isRequired,
  props: PropTypes.shape({}).isRequired,
};
FFAware.defaultProps = {
};

export default FFAware;
