import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Layer, Source } from 'react-mapbox-gl';
import { getFillPaint, getLinePaint, getTypeProp, getGeoJSON } from './utils';
import { useAddBoundsToMap } from './hooks';
import { getID } from '../utils';


const Polygon = (props) => {
  const {
    type,
    area,
    // TODO: implement
    // onClick,
  } = props;

  useAddBoundsToMap(area);

  const sourceId = useRef(getID()).current;
  const fillPaint = getFillPaint(type);
  const linePaint = getLinePaint(type);

  let fillLayer;
  if (fillPaint) {
    fillLayer = <Layer type="fill" sourceId={sourceId} paint={fillPaint} />;
  }

  return (
    <>
      <Source geoJsonSource={getGeoJSON(area)} id={sourceId} />
      {fillLayer}
      <Layer type="line" sourceId={sourceId} paint={linePaint} />
    </>
  );
};

Polygon.propTypes = {
  type: getTypeProp().isRequired,
  area: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  // onClick: PropTypes.func,
};

export default Polygon;
