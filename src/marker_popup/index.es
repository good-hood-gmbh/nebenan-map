/* eslint react/no-unused-prop-types: "off" */
import PropTypes from 'prop-types';
import MapComponent from '../base';


class MarkerPopup extends MapComponent {
  update() {
    this.destroy();
    this.create();
  }

  create() {
    // const { popup: createPopup } = require('leaflet');
    const { content, className, options: baseOptions, defaultOpen, marker } = this.props;
    const options = { ...baseOptions, className };

    const popup = createPopup(options);
    popup.setContent(content);
    marker.bindPopup(popup);
    if (defaultOpen) marker.openPopup();

    this.popup = popup;
  }

  destroy() {
    this.props.marker.unbindPopup();
    this.popup = null;
  }

  render() { return null; }
}

MarkerPopup.defaultProps = {
  defaultOpen: false,
};

MarkerPopup.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  options: PropTypes.object,
  defaultOpen: PropTypes.bool.isRequired,

  marker: PropTypes.object,
};

export default MarkerPopup;
