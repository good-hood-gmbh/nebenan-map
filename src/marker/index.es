import PropTypes from 'prop-types';
import { useMarker } from './hooks';

const Marker = (props) => {
  useMarker(props);
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
