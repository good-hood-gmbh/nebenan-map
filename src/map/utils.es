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

// export const getTileUrl = (credentials) => (
//   credentials
//     ? 'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}'
//     : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
// );

export const getTileUrl = () => 'https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=h5gjGa1Ak2h0KgddSpXq';


export const getTileOptions = (credentials) => {
  const osm = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  if (!credentials) return { attribution: osm };

  const attribution = `Map data ${osm},
    <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
    Imagery © <a href="http://mapbox.com">Mapbox</a>`;

  return { attribution, ...credentials };
};

export const isViewChanged = (props, nextProps) => viewProps.some((prop) => (
  props[prop] !== nextProps[prop]
));
