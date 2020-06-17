import { LngLatBounds } from 'mapbox-gl';


export const getStyle = (credentials) => (
  `https://api.maptiler.com/maps/streets/style.json?key=${credentials.key}`
);

export const getLngLatBounds = (bounds) => {
  if (!bounds) return undefined;

  const initial = new LngLatBounds(bounds[0], bounds[0]);
  const collect = (acc, item) => acc.extend(item);

  return bounds.reduce(collect, initial);
};
