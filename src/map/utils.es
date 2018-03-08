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

export const getTileUrl = () => (
  'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}'
);

export const getTileOptions = (credentials) => {
  const { id, token } = credentials;
  const attribution =
    `Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,
    <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
    Imagery © <a href="http://mapbox.com">Mapbox</a>`;

  return { id, token, attribution };
};

export const isViewChanged = (props, nextProps) => viewProps.some((prop) => (
  props[prop] !== nextProps[prop]
));
