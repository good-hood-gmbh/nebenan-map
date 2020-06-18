import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';


const LabelMarker = ({
  children,
  className,
  content,
  ...rest
}) => (
  <Marker {...rest} className={clsx('c-label_marker', className)}>
    <span className="c-label_marker-container">{content}</span>
    {children}
  </Marker>
);

LabelMarker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default LabelMarker;
