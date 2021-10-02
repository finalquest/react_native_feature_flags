import React from 'react';

const FFContext = React.createContext({
  restrictions: [],
  replacement: undefined,
  hideall: false,
});

export default FFContext;
