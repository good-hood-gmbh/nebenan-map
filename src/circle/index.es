import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Layer, Source } from 'react-mapbox-gl';
import { getTypeProp, getPaint, getGeoJSON } from './utils';
import { getID } from '../utils';


const Circle = ({
  type,
  center,
  radius,
}) => {
  const sourceId = useRef(getID()).current;

  return (
    <>
      <Source geoJsonSource={getGeoJSON(center)} id={sourceId} />
      <Layer type="circle" sourceId={sourceId} paint={getPaint(type, radius)} />
    </>
  );
};

Circle.propTypes = {
  type: getTypeProp().isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  radius: PropTypes.number.isRequired,
};

export default Circle;
