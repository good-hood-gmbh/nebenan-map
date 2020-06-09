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

export const getTileUrl = (credentials) => (
  credentials
    ? `https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=${credentials.key}`
    : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
);

export const getTileOptions = (credentials) => {
  const osm = '<a href="http://osm.org/copyright" target="_blank" rel="noopener noreferrer">&copy; OpenStreetMap contributors</a>';
  if (!credentials) return { attribution: osm };

  const attribution = `
    <a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener noreferrer">&copy; MapTiler</a> ${osm}
  `;

  return { attribution };
};

export const isViewChanged = (props, nextProps) => viewProps.some((prop) => (
  props[prop] !== nextProps[prop]
));
