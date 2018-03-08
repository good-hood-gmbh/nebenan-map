import { COLOR_ACTION, COLOR_BASE, WEIGHT_L } from '../constants';
import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';


const STYLES = {
  [CIRCLE_ACTIVE]: {
    color: COLOR_ACTION,
    fillColor: COLOR_ACTION,
    weight: WEIGHT_L,
    interactive: false,
    radius: 300,
  },
  [CIRCLE_DEFAULT]: {
    color: COLOR_BASE,
    fillColor: COLOR_BASE,
    weight: WEIGHT_L,
    interactive: false,
    radius: 750,
  },
};

export const getOptions = ({ type, radius }) => {
  const preset = STYLES[type];
  return { ...preset, interactive: false, radius };
};
