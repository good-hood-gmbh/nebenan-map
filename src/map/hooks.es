import { useEffect, useState, useRef } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { getMedia, media } from '../utils';


export const userMapboxComponent = (locked, lockedMobile, noAttribution) => {
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
