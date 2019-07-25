/* eslint react/no-unused-prop-types: "off" */
import PropTypes from 'prop-types';
import React from 'react';

import { reverse } from '../utils';
import { getIcon } from './utils';

import MapComponent from '../base';
import { Provider } from './context';


class Marker extends MapComponent {
  constructor(props) {
    super(props);
    this.state = {
      isContextReady: false,
    };
  }

  setMarker(marker) {
    this.marker = marker;
    this.setState({ isContextReady: Boolean(marker) });
  }

  updateListener(prevProps, listener, prop) {
    if (this.props[prop] === prevProps[prop]) return;
    this.marker.off(listener);
    this.marker.on(listener, this.props[prop]);
  }

  update(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.destroy();
      this.create();
      return;
    }

    const { marker } = this;
    const { position, divIcon, icon: defaultIcon, tooltip } = this.props;

    if (position !== prevProps.position) {
      marker.setLatLng(reverse(position));
    }

    if (divIcon !== prevProps.divIcon || defaultIcon !== prevProps.icon) {
      const icon = getIcon(this.leaflet, divIcon, defaultIcon);
      marker.setIcon(icon);
    }

    if (prevProps.tooltip !== tooltip) {
      marker.unbindTooltip();
      marker.bindTooltip(tooltip);
    }

    this.updateListener(prevProps, 'click', 'onClick');
    this.updateListener(prevProps, 'popupopen', 'onPopupOpen');
    this.updateListener(prevProps, 'popupclose', 'onPopupClose');
  }

  create() {
    this.leaflet = require('leaflet');
    const { marker: createMarker } = this.leaflet;
    const {
      tooltip,
      position,
      options,
      divIcon,
      icon: defaultIcon,
      onClick,
      onPopupOpen,
      onPopupClose,
    } = this.props;

    const icon = getIcon(this.leaflet, divIcon, defaultIcon);
    const interactive = Boolean(onClick);
    const marker = createMarker(reverse(position), { ...options, icon, interactive });

    if (tooltip) marker.bindTooltip(tooltip);
    if (onPopupOpen) marker.on('popupopen', onPopupOpen);
    if (onPopupClose) marker.on('popupclose', onPopupClose);
    if (onClick) marker.on('click', onClick);

    this.getMap().element.addLayer(marker);
    this.setMarker(marker);
  }

  destroy() {
    this.getMap().element.removeLayer(this.marker);
    this.marker.off();
    this.setMarker(null);
  }

  render() {
    if (!this.state.isContextReady) return null;
    return <Provider value={this.marker}>{this.props.children}</Provider>;
  }
}

Marker.propTypes = {
  children: PropTypes.node,
  position: PropTypes.arrayOf(PropTypes.number),
  options: PropTypes.object,
  divIcon: PropTypes.object,
  icon: PropTypes.object,
  tooltip: PropTypes.string,

  onClick: PropTypes.func,
  onPopupOpen: PropTypes.func,
  onPopupClose: PropTypes.func,
};

export default Marker;
