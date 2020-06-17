import { PureComponent } from 'react';
// import MapContext from '../map/context';


class MapComponent extends PureComponent {
  componentDidMount() {
    this.create();
    this.getMap().addElement(this);
  }

  componentDidUpdate(prevProps) {
    this.update(prevProps);
  }

  componentWillUnmount() {
    this.destroy();
    this.getMap().removeElement(this);
  }

  // Override if element can provide bounds
  getBounds() { return null; }
  getMap() { return this.context; }

  // Mandatory
  // create() {}
  // update(prevProps) {}
  // destroy() {}
}

export default MapComponent;
