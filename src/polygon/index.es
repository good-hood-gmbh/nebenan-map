/* eslint react/no-unused-prop-types: "off" */
import PropTypes from 'prop-types';

import { reverse } from '../utils';
import { getOptions } from './utils';
import {
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT,
} from './constants';

import MapComponent from '../base';


class Polygon extends MapComponent {
  update() {
    this.destroy();
    this.create();
  }

  getBounds() {
    if (!this.polygon) return null;
    return this.polygon.getBounds();
  }

  create() {
    const { polygon: createPolygon } = require('leaflet');
    const { area, onClick } = this.props;
    const { map } = this.context;
    console.warn('MAP', map)
    const options = getOptions(this.props);
    const polygon = createPolygon(area.map(reverse), options);

    if (onClick) polygon.on('click', onClick);

    map.addLayer(polygon);
    this.polygon = polygon;
  }

  destroy() {
    const { map } = this.context;

    this.polygon.off();
    map.removeLayer(this.polygon);
    this.polygon = null;
  }

  render() { return null; }
}

Polygon.defaultProps = {
  type: POLYGON_DEFAULT,
};

Polygon.propTypes = {
  type: PropTypes.oneOf([
    POLYGON_ACTIVE,
    POLYGON_HIGHLIGHTED,
    POLYGON_SOLID,
    POLYGON_THIN,
    POLYGON_DEFAULT,
  ]).isRequired,

  area: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number),
  ).isRequired,

  options: PropTypes.object,

  onClick: PropTypes.func,
};

export default Polygon;
