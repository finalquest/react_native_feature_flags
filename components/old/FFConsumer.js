/* eslint-disable react/prop-types */
import React from 'react';
import FFContext from './FFContext';

const withFF = Component => ({ features, ...props }) => (
  <FFContext.Consumer>
    {({ restrictions, replacement, hideall }) => {
      const ff = features && features.length > 0;
      const rr = restrictions && restrictions.length > 0;
      const restricted = ff && rr && restrictions.some(r => features.indexOf(r) !== -1);
      if ((ff && hideall) || restricted) {
        return replacement || null;
      }
      return (<Component {...props} />);
    }}
  </FFContext.Consumer>
);


export default withFF;
