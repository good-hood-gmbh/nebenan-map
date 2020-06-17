import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Source } from 'react-mapbox-gl';
import { getFillPaint, getLinePaint, getTypeProp, getGeoJSON } from './utils';


const Polygon = (props) => {
  const {
    type,
    area,
  } = props;

  const fillPaint = getFillPaint(type);
  const linePaint = getLinePaint(type);

  let fillLayer;
  if (fillPaint) {
    fillLayer = <Layer type="fill" sourceId="polygon" paint={fillPaint} />;
  }

  let lineLayer;
  if (linePaint) {
    lineLayer = <Layer type="line" sourceId="polygon" paint={linePaint} />;
  }

  return (
    <>
      <Source geoJsonSource={getGeoJSON(area)} id="polygon" />
      {fillLayer}
      {lineLayer}
    </>
  );
};

Polygon.propTypes = {
  type: getTypeProp().isRequired,
  area: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default Polygon;
