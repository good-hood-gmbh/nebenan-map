import React from 'react';
import PropTypes from 'prop-types';
import { Marker as MapboxMarker } from 'react-mapbox-gl';


const Marker = ({
  position,
  tooltip,

  onPopupOpen,
  onPopupClose,
  ...rest
}) => (
  <MapboxMarker
    {...rest}
    coordinates={position}
    anchor="bottom"
  />
);

Marker.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  // TODO: implement using popup
  tooltip: PropTypes.string,

  // TODO: find out where this props are used outside package
  // options: PropTypes.object,
  // divIcon: PropTypes.object,
  // icon: PropTypes.object,

  // TODO: Move to Popup?
  onPopupOpen: PropTypes.func,
  onPopupClose: PropTypes.func,
};

export default Marker;
