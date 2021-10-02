import React from 'react';
import PropTypes from 'prop-types';

const TestComponent = ({ children, name }) => (
  <div id={name}>
    {children}
  </div>
);
TestComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  name: PropTypes.string,
};
TestComponent.defaultProps = {
  children: undefined,
  name: undefined,
};

export default TestComponent;
