import React, { forwardRef } from 'react';
import { Consumer } from './context';


module.exports = (Component) => (
  forwardRef((props, ref) => (
    <Consumer>{(marker) => <Component {...props} {...{ ref, marker }} />}</Consumer>
  ))
);
