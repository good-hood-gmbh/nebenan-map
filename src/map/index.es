import React from 'react';
import PropTypes from 'prop-types';
import { NavigationControl } from 'mapbox-gl';

import clsx from 'clsx';
import { userMapboxComponent } from './hooks';
import { getStyle, getFitBounds } from './utils';


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

  const MapboxComponent = userMapboxComponent(locked, lockedMobile, noAttribution);
  if (!MapboxComponent) return null;

  const className = clsx('c-map', passedClassName);
  const zoom = defaultZoom ? [defaultZoom] : undefined;
  const fitBounds = getFitBounds(bounds);
  const center = defaultView || undefined;
  const style = getStyle(credentials);

  const handleLoad = (map) => {
    map.addControl(new NavigationControl());
    if (fitBounds) {
      map.fitBounds(fitBounds, {
        linear: true,
        padding: 20,
      });
    }

    if (onLoad) onLoad(map);
  };

  return (
    <MapboxComponent
      {...rest}
      {...{ className, zoom, center, style }}
      fitBounds={bounds || undefined}
      onStyleLoad={handleLoad}
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
