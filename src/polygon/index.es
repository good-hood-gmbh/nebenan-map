import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Source } from 'react-mapbox-gl';
import { getPaintOptions, getTypeProp } from './utils';


const Polygon = (props) => {
  const {
    type,
    area,
    ...rest
  } = props;

  const geoJSON = {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [area],
      },
    },
  };

  return (
    <>
      <Source geoJsonSource={geoJSON} id="polygon" />
      <Layer
        {...rest}
        type="fill"
        paint={getPaintOptions(type)}
        sourceId="polygon"
      />
    </>
  );
};

Polygon.propTypes = {
  type: getTypeProp().isRequired,
  area: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default Polygon;
