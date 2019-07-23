import { PureComponent } from 'react';
import MapContext from '../map/context';


class MapComponent extends PureComponent {
  componentDidMount() {
    this.create();
    this.context.addElement(this);
  }

  componentDidUpdate(prevProps) {
    this.update(prevProps);
  }

  componentWillUnmount() {
    this.destroy();
    this.context.removeElement(this);
  }

  // Override if element can provide bounds
  getBounds() { return null; }

  // Mandatory
  // create(props, context) {}
  // update(nextProps, nextContext) {}
  // destroy() {}
}

MapComponent.contextType = MapContext;

export default MapComponent;
