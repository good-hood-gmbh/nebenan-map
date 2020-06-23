import { LngLatBounds } from 'mapbox-gl';


export const getBoundsCenter = (bounds) => ([
  (bounds[0][0] + bounds[1][0]) / 2,
  (bounds[0][1] + bounds[1][1]) / 2,
]);

export const getStyle = (credentials) => (
  `https://api.maptiler.com/maps/075de9e7-0503-4e15-87af-7b99e074604c/style.json?key=${credentials.key}`
);

export const getLngLatBounds = (bounds) => {
  if (!Array.isArray(bounds) || !bounds.length) return undefined;

  const initial = new LngLatBounds(bounds[0], bounds[0]);
  const collect = (acc, item) => acc.extend(item);

  return bounds.reduce(collect, initial);
};

export const fitBounds = (map, bounds, animate = true) => {
  if (bounds && bounds.length) {
    map.fitBounds(getLngLatBounds(bounds), {
      padding: 20,
      animate,
    });
  }
};
