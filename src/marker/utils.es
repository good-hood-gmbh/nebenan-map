import { render } from 'react-dom';
import { Marker, Popup } from 'mapbox-gl';


export const createMarker = (win, content, className) => {
  const element = win.document.createElement('div');
  element.className = className;
  render(content, element);

  return new Marker(element);
};

export const createPopup = (win, content, options) => {
  const element = win.document.createElement('div');
  render(content, element);
  return new Popup(options).setDOMContent(element);
};
