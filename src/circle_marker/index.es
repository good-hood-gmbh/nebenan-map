import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';


const CircleMarker = ({
  children,
  className,
  content,
  ...rest
}) => (
  <Marker {...rest} className={clsx('c-circle_marker', className)}>
    <span className="c-circle_marker-container">
      <span className="c-circle_marker-text">{content}</span>
    </span>
    {children}
  </Marker>
);

CircleMarker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.string,
};

export default CircleMarker;
