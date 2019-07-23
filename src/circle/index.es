/* eslint react/no-unused-prop-types: "off" */
import PropTypes from 'prop-types';

import { reverse } from '../utils';
import { getOptions } from './utils';
import {
  CIRCLE_ACTIVE,
  CIRCLE_DEFAULT,
} from './constants';

import MapComponent from '../base';


class Circle extends MapComponent {
  update() {
    this.destroy();
    this.create();
  }

  create() {
    const { circle: createCircle } = require('leaflet');
    const { map } = this.context;
    const { center } = this.props;
    const options = getOptions(this.props);
    const circle = createCircle(reverse(center), options);

    map.addLayer(circle);
    this.circle = circle;
  }

  destroy() {
    const { map } = this.context;
    map.removeLayer(this.circle);
    this.circle = null;
  }

  render() { return null; }
}

Circle.defaultProps = {
  type: CIRCLE_DEFAULT,
};

Circle.propTypes = {
  type: PropTypes.oneOf([
    CIRCLE_ACTIVE,
    CIRCLE_DEFAULT,
  ]).isRequired,

  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  radius: PropTypes.number.isRequired,
};

export default Circle;
