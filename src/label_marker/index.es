import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';


const LabelMarker = (props) => {
  const { content, className, ...cleanProps } = props;
  const iconClass = clsx('c-label_marker', className);

  const html = `<span class="c-label_marker-container">${content}</span>`;

  const icon = {
    html,
    className: iconClass,
    iconSize: false,
  };

  return <Marker {...cleanProps} divIcon={icon} />;
};

LabelMarker.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default LabelMarker;
