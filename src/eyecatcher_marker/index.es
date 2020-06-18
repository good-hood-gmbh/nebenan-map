import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';


const EyecatcherMarker = ({
  children,
  className,
  content,
  ...rest
}) => (
  <Marker {...rest} className={clsx('c-eyecatcher_marker', className)}>
    <div className="c-eyecatcher_marker-container">
      {content}
    </div>`
    {children}
  </Marker>
);

EyecatcherMarker.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.string,
};

export default EyecatcherMarker;
