import React, { forwardRef } from 'react';
import { Consumer } from './context';


export default (Component) => (
  forwardRef((props, ref) => (
    <Consumer>{(marker) => <Component {...props} {...{ ref, marker }} />}</Consumer>
  ))
);
