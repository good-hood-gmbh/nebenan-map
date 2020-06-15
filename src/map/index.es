import React from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import clsx from 'clsx';


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

  const MapboxMap = ReactMapboxGl({
    apiUrl: null,
    interactive: !locked && !lockedMobile,
    attributionControl: !noAttribution,
  });

  return (
    <MapboxMap
      {...rest}
      style="https://api.maptiler.com/maps/streets/style.json?key=h5gjGa1Ak2h0KgddSpXq"
    />
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
  children: PropTypes.any,

  credentials: PropTypes.object,

  animate: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  lockedMobile: PropTypes.bool.isRequired,
  noAttribution: PropTypes.bool.isRequired,

  bounds: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number),
  ),
  defaultView: PropTypes.arrayOf(PropTypes.number),
  defaultZoom: PropTypes.number,

  onLoad: PropTypes.func,
};

export default Map;
