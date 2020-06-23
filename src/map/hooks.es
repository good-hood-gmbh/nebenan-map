import { useEffect, useState, useRef } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { NavigationControl } from 'mapbox-gl';

import { getMedia, media } from '../utils';
import { getBoundsCenter, fitBounds } from './utils';


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
      apiUrl: null,
      attributionControl: !noAttribution,
    });

    // Force re-render
    setState({});
  }, [locked, lockedMobile, noAttribution]);

  return ref.current;
};

export const useDefaultCenterAndZoom = (defaultZoom, defaultView, bounds) => {
  const zoomRef = useRef(defaultZoom ? [defaultZoom] : undefined);
  const centerRef = useRef((bounds ? getBoundsCenter(bounds) : defaultView) || undefined);

  return [centerRef.current, zoomRef.current];
};

export const useMapInit = (defaultBounds, childrenBoundsSet, callback) => {
  const mapRef = useRef(false);

  const fitChildrenBounds = () => {
    const merged = [...childrenBoundsSet].reduce((acc, bounds) => acc.concat(bounds), []);
    fitBounds(mapRef.current, merged, false);
  };

  const loadHandler = (map) => {
    mapRef.current = map;
    map.addControl(new NavigationControl());

    if (defaultBounds) {
      fitBounds(map, defaultBounds, false);
    } else {
      // Wait for children render
      process.nextTick(fitChildrenBounds);
    }

    if (callback) callback(map);
  };

  return [mapRef, loadHandler];
};

export const useBoundsUpdate = (mapRef, bounds) => {
  useEffect(() => {
    if (mapRef.current) {
      fitBounds(mapRef.current, bounds);
    }
  }, [bounds]);
};

export const useContextValue = () => {
  const boundsSet = useRef(new Set()).current;
  const contextValue = useRef({
    addBounds: (value) => {
      boundsSet.add(value);
      return () => boundsSet.delete(value);
    },
  }).current;

  return [boundsSet, contextValue];
};
