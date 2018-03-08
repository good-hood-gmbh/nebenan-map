import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import classNames from 'classnames';

import { reverse } from '../utils';
import { getMapOptions, getTileUrl, getTileOptions, isViewChanged } from './utils';


class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.elements = [];
    this.state = {
      isReady: false,
    };

    this.addElement = this.addElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
  }

  componentDidMount() { this.create(this.props); }
  componentDidUpdate(prevProps) { this.update(prevProps); }
  componentWillUnmount() { this.destroy(); }

  getChildContext() {
    return {
      map: {
        element: this.map,
        addElement: this.addElement,
        removeElement: this.removeElement,
      },
    };
  }

  getElementsBounds() {
    return this.elements.reduce((acc, element) => {
      const bounds = element.getBounds();
      return bounds ? acc.concat(bounds) : acc;
    }, []);
  }

  setMap(map) {
    this.map = map;
    this.setState({ isReady: Boolean(map) });
  }

  addElement(Component) {
    if (!this.elements.includes(Component)) this.elements.push(Component);
  }

  removeElement(Component) {
    this.elements = this.elements.filter((item) => item !== Component);
  }

  update(prevProps) {
    if (isViewChanged(prevProps, this.props)) {
      this.destroy();
      this.create(this.props);
      return;
    }

    const { bounds, animate } = this.props;
    const { map } = this;

    let fitBounds;
    if (bounds && prevProps.bounds !== bounds) {
      fitBounds = bounds.map(reverse);
    } else {
      fitBounds = this.getElementsBounds();
    }

    if (!fitBounds || !fitBounds.length) return;

    if (animate) {
      map.flyToBounds(fitBounds);
    } else {
      map.fitBounds(fitBounds);
    }
  }

  create(props) {
    const { map: createMap, tileLayer: createTile } = require('leaflet');

    const options = getMapOptions(global, props);
    const map = createMap(this.node, options);

    const tile = createTile(getTileUrl(props.credentials), getTileOptions(props.credentials));
    map.addLayer(tile);
    this.tile = tile;

    const { bounds, defaultView, defaultZoom, onLoad } = props;

    if (bounds) {
      map.fitBounds(bounds.map(reverse));
    } else if (defaultView) {
      map.setView(reverse(defaultView), defaultZoom);
    }

    if (onLoad) tile.once('load', onLoad);

    this.setMap(map);
  }

  destroy() {
    this.tile.off();
    this.tile = null;

    this.map.stop();
    this.map.remove();
    this.setMap(null);
  }

  render() {
    const className = classNames('c-map', this.props.className);
    const cleanProps = omit(this.props,
      'children',
      'locked',
      'lockedMobile',
      'animate',
      'noAttribution',
      'bounds',
      'defaultView',
      'defaultZoom',
    );

    const ref = (el) => { this.node = el; };

    // Render children only when map is ready
    let children;
    if (this.state.isReady) children = this.props.children;

    return <article {...cleanProps} {...{ className, ref }}>{children}</article>;
  }
}

Map.childContextTypes = {
  map: PropTypes.object,
};

Map.contextTypes = null;

Map.defaultProps = {
  animate: false,
  locked: false,
  lockedMobile: true,
  noAttribution: false,
};

Map.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  animate: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  lockedMobile: PropTypes.bool.isRequired,
  noAttribution: PropTypes.bool.isRequired,

  bounds: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number),
  ),

  credentials: PropTypes.object,

  defaultView: PropTypes.arrayOf(PropTypes.number),
  defaultZoom: PropTypes.number,

  onLoad: PropTypes.func,
};

export default Map;
