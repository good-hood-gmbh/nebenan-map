import PropTypes from 'prop-types';

import {
  COLOR_ACTION,
  COLOR_DARK70,

  WEIGHT_S,
  WEIGHT_L,

  OPACITY_N,
  OPACITY_S,
  OPACITY_M,
} from '../constants';

import {
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT,
} from './constants';


const borderStyles = {
  // 'line-width': WEIGHT_L,
  // 'line-color': COLOR_DARK70,
};

const STYLES = {
  [POLYGON_ACTIVE]: {
    ...borderStyles,
    'fill-color': COLOR_ACTION,
    'fill-opacity': OPACITY_S,
  },
  [POLYGON_HIGHLIGHTED]: {
    ...borderStyles,
    'fill-color': COLOR_DARK70,
    'fill-opacity': OPACITY_M,
  },
  [POLYGON_SOLID]: {
    ...borderStyles,
    'fill-color': COLOR_DARK70,
    'fill-opacity': OPACITY_S,
  },
  [POLYGON_THIN]: {
    ...borderStyles,
    'fill-color': COLOR_DARK70,
    'fill-opacity': OPACITY_S,
    // 'line-width': WEIGHT_S,
  },
  [POLYGON_DEFAULT]: {
    ...borderStyles,
    'fill-opacity': OPACITY_N,
    // 'line-dasharray': [5, 10],
  },
};

export const getPaintOptions = (type) => STYLES[type];

export const getTypeProp = () => PropTypes.oneOf([
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT,
]);
