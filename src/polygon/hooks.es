import { useContext, useEffect } from 'react';
import MapContext from '../map/context';


export const useAddBoundsToMap = (area) => {
  const map = useContext(MapContext);
  useEffect(() => map && map.addBounds(area), [map]);
};
