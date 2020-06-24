import { useEffect, useState, useRef, useContext } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { getMedia, media } from '../utils';
import MapContext from './context';


export const useMapboxComponent = (locked, lockedMobile, noAttribution) => {
  const [, setState] = useState();
  const ref = useRef(null);

  useEffect(() => {
    const isMobile = !getMedia(global, media.mediaM);
    const interactive = isMobile ? !lockedMobile : !locked;

    ref.current = ReactMapboxGl({
      dragPan: interactive,
      keyboard: false,
      doubleClickZoom: false,
      scrollZoom: false,
      injectCSS: false,
      dragRotate: false,
      pitchWithRotate: false,
      apiUrl: null,
      attributionControl: !noAttribution,
    });

    // Force re-render
    setState({});
  }, [locked, lockedMobile, noAttribution]);

  return ref.current;
};

export const useDefaultCenterAndZoom = (defaultZoom, defaultView) => {
  const zoomRef = useRef(defaultZoom ? [defaultZoom] : undefined);
  const centerRef = useRef(defaultView || undefined);

  return [centerRef.current, zoomRef.current];
};

export const useContextValue = () => {
  const [bounds, setBounds] = useState([]);

  const contextValue = useRef({
    addBounds: (value) => {
      setBounds((arr) => [...arr, value]);
      return () => setBounds((arr) => arr.filter((item) => item !== value));
    },
  }).current;

  return [bounds, contextValue];
};

export const useChildrenBounds = (area) => {
  const map = useContext(MapContext);
  useEffect(() => map && map.addBounds(area), [map]);
};
