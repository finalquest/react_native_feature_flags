import React from 'react';
import PropTypes from 'prop-types';
import FFContext from './FFContext';
import withFF from './FFConsumer';

const FFProvider = ({
  restrictions, replacement, children, flag,
}) => {
  const ctx = { restrictions, replacement, flag };
  const FFComponent = withFF(children);
  return (
    <FFContext.Provider value={ctx}>
      <FFComponent />
    </FFContext.Provider>
  );
};
FFProvider.propTypes = {
  restrictions: PropTypes.arrayOf(PropTypes.string),
  replacement: PropTypes.node,
  children: PropTypes.element.isRequired,
  flag: PropTypes.string.isRequired,
};
FFProvider.defaultProps = {
  restrictions: [],
  replacement: undefined,
};
export default FFProvider;
