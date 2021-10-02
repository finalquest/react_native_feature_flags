import React from 'react';
import PropTypes from 'prop-types';
import FFContext from './FFContext';
import FFAware from './FFAware';

const FFProvider = ({
  restrictions, replacement, hideall, auto, children,
}) => {
  const ctx = { restrictions, replacement, hideall };
  const el = React.Children.only(children);
  return (
    <FFContext.Provider value={ctx}>
      {auto ? FFAware(el) : el}
    </FFContext.Provider>
  );
};
FFProvider.propTypes = {
  restrictions: PropTypes.arrayOf(PropTypes.string),
  replacement: PropTypes.node,
  auto: PropTypes.bool,
  hideall: PropTypes.bool,
  children: PropTypes.element.isRequired,
};
FFProvider.defaultProps = {
  restrictions: [],
  replacement: undefined,
  auto: false,
  hideall: false,
};
export default FFProvider;
