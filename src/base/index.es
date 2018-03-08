import { PureComponent } from 'react';
import PropTypes from 'prop-types';


class MapComponent extends PureComponent {
  componentDidMount() {
    this.create(this.props, this.context);
    this.context.map.addElement(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.update(nextProps, nextContext);
  }

  componentWillUnmount() {
    this.destroy();
    this.context.map.removeElement(this);
  }

  // Override if element can provide bounds
  getBounds() { return null; }

  // Mandatory
  // create(props, context) {}
  // update(nextProps, nextContext) {}
  // destroy() {}
}

MapComponent.contextTypes = {
  map: PropTypes.object,
};

export default MapComponent;
