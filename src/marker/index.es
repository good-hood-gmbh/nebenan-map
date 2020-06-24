import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContext } from 'react-mapbox-gl';
import { useChildrenBounds } from '../map/hooks';
import { createMarker, createPopup } from './utils';


const Marker = ({
  className,
  children,
  position,

  popupDefaultState,
  popupContent,
  popupOffset,
}) => {
  const map = useContext(MapContext);
  useChildrenBounds([position]);

  useEffect(() => {
    if (!map) return;

    const marker = createMarker(global, children, className).setLngLat(position).addTo(map);

    let popup;
    if (popupContent) {
      popup = createPopup(global, popupContent, { offset: popupOffset });
      marker.setPopup(popup);
    }

    if (popupDefaultState) {
      marker.togglePopup();
    }

    return () => {
      marker.remove();
      if (popup) popup.remove();
    };
  }, [map, children, popupContent, popupOffset]);

  return null;
};

Marker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.arrayOf(PropTypes.number),

  popupContent: PropTypes.node,
  popupDefaultState: PropTypes.bool,
  popupOffset: PropTypes.arrayOf(PropTypes.number),
};

export default Marker;
