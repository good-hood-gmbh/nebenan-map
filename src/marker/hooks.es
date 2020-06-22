import { useContext, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContext } from 'react-mapbox-gl';
import { Marker, Popup } from 'mapbox-gl';


const createMarker = (win, content, className) => {
  const element = win.document.createElement('div');
  element.innerHTML = renderToStaticMarkup(content);
  element.className = className;

  return new Marker(element);
};

const createPopup = (win, content, options) => {
  const html = renderToStaticMarkup(content);
  return new Popup(options).setHTML(html);
};

export const useMarker = ({
  className,
  children,
  position,

  popupDefaultState,
  popupContent,
  popupOffset,
}) => {
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const marker = createMarker(global, children, className).setLngLat(position).addTo(map);

    let popup;
    if (popupContent) {
      popup = createPopup(global, popupContent, { offset: popupOffset });
      marker.setPopup(popup);
    }

    if (popupDefaultState) {
      marker.togglePopup();
    }

    return () => {
      marker.remove();
      if (popup) popup.remove();
    };
  }, [map, children, popupContent, popupOffset]);
};
