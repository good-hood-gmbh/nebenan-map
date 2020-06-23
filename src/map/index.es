import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { useMapboxComponent, useDefaultCenterAndZoom, useMapInit, useBoundsUpdate } from './hooks';
import { getStyle } from './utils';


const Map = (props) => {
  const {
    className: passedClassName,

    credentials,

    locked,
    lockedMobile,
    noAttribution,

    bounds,
    defaultView,
    defaultZoom,

    onLoad,
    ...rest
  } = props;

  const MapboxComponent = useMapboxComponent(locked, lockedMobile, noAttribution);
  const [center, zoom] = useDefaultCenterAndZoom(defaultZoom, defaultView, bounds);
  const [mapRef, loadHandler] = useMapInit(bounds, onLoad);
  useBoundsUpdate(mapRef, bounds);

  if (!MapboxComponent) return null;

  return (
    <MapboxComponent
      {...rest}
      className={clsx('c-map', passedClassName)}
      zoom={zoom}
      center={center}
      style={getStyle(credentials)}
      onStyleLoad={loadHandler}
    />
  );
};

Map.defaultProps = {
  locked: false,
  lockedMobile: true,
  noAttribution: false,
};

Map.propTypes = {
  className: PropTypes.string,

  credentials: PropTypes.object,

  locked: PropTypes.bool.isRequired,
  lockedMobile: PropTypes.bool.isRequired,
  noAttribution: PropTypes.bool.isRequired,

  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  defaultView: PropTypes.arrayOf(PropTypes.number),
  defaultZoom: PropTypes.number,

  onLoad: PropTypes.func,
};

export default Map;
