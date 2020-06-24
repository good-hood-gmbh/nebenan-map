import React from 'react';
import PropTypes from 'prop-types';
import { NavigationControl } from 'mapbox-gl';

import clsx from 'clsx';
import { useMapboxComponent, useDefaultCenterAndZoom, useContextValue } from './hooks';
import { getStyle, getBoundingBox, mergeChildrenBounds } from './utils';

import { Provider } from './context';


const Map = (props) => {
  const {
    className: passedClassName,
    children,

    credentials,

    animate,
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
  const [center, zoom] = useDefaultCenterAndZoom(defaultZoom, defaultView);
  const [childrenBounds, contextValue] = useContextValue();

  if (!MapboxComponent) return null;

  const loadHandler = (map) => {
    map.addControl(new NavigationControl());
    if (onLoad) onLoad(map);
  };

  const fitBounds = bounds || mergeChildrenBounds(childrenBounds);

  return (
    <MapboxComponent
      {...rest}
      className={clsx('c-map', passedClassName)}
      zoom={zoom}
      center={center}
      fitBounds={getBoundingBox(fitBounds)}
      fitBoundsOptions={{ animate, padding: 20 }}
      style={getStyle(credentials)}
      onStyleLoad={loadHandler}
    >
      <Provider value={contextValue}>{children}</Provider>
    </MapboxComponent>
  );
};

Map.defaultProps = {
  animate: false,
  locked: false,
  lockedMobile: true,
  noAttribution: false,
};

Map.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  credentials: PropTypes.object,

  animate: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  lockedMobile: PropTypes.bool.isRequired,
  noAttribution: PropTypes.bool.isRequired,

  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  defaultView: PropTypes.arrayOf(PropTypes.number),
  defaultZoom: PropTypes.number,

  onLoad: PropTypes.func,
};

export default Map;
