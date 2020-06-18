import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Source } from 'react-mapbox-gl';
import { getTypeProp, getPaint, getGeoJSON } from './utils';


const Circle = ({
  type,
  center,
  radius,
}) => (
  <>
    <Source geoJsonSource={getGeoJSON(center)} id="circle" />
    <Layer type="circle" sourceId="circle" paint={getPaint(type, radius)} />
  </>
);

Circle.propTypes = {
  type: getTypeProp().isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  radius: PropTypes.number.isRequired,
};

export default Circle;
