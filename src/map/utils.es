import { getMedia, media } from '../utils';

const controlsProps = [
  'doubleClickZoom',
  'boxZoom',
  'touchZoom',
  'dragging',
  'tap',
  'zoomControl',
];

const viewProps = [
  'locked',
  'lockedMobile',
  'noAttribution',
];

export const getMapOptions = (node, { noAttribution, locked, lockedMobile }) => {
  const isMobile = !getMedia(node, media.mediaM);
  const isControlsEnabled = isMobile ? !lockedMobile : !locked;

  const base = controlsProps.reduce((acc, prop) => {
    acc[prop] = isControlsEnabled;
    return acc;
  }, {});

  return { ...base, scrollWheelZoom: false, attributionControl: !noAttribution };
};

export const getMapboxGLOptions = () => ({
  interactive: false,
  accessToken: 'no-token',
  style: 'https://api.maptiler.com/maps/voyager/style.json?key=h5gjGa1Ak2h0KgddSpXq',
});

export const isViewChanged = (props, nextProps) => viewProps.some((prop) => (
  props[prop] !== nextProps[prop]
));
