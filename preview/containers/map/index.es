import React, { PureComponent } from 'react';

import Checkbox from 'nebenan-form/lib/checkbox';
import Select from 'nebenan-form/lib/select';
import Input from 'nebenan-form/lib/input';

import Header from '../../components/header';

import content from '../../sample_data';
import {
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT,
} from '../../../lib/polygon/constants';
import {
  PIN_MARKER_GREEN,
  PIN_MARKER_BASE,
  PIN_MARKER_ORANGE,
  PIN_MARKER_YELLOW,
  PIN_MARKER_RED,
  PIN_MARKER_GRAY,
  PIN_MARKER_BLUE,
} from '../../../lib/pin_marker/constants';
import {
  CIRCLE_ACTIVE,
  CIRCLE_DEFAULT,
} from '../../../lib/circle/constants';

import Map from '../../../lib/map';
import Polygon from '../../../lib/polygon';
import Circle from '../../../lib/circle';

import PinMarker from '../../../lib/pin_marker';
import CirleMarker from '../../../lib/circle_marker';
import EyecatherMarker from '../../../lib/eyecatcher_marker';
import InfoMarker from '../../../lib/info_marker';
import ImageMarker from '../../../lib/image_marker';
import LabelMarker from '../../../lib/label_marker';

import MarkerPopup from '../../../lib/marker_popup';


const polygonTypes = [
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT,
];

const circleTypes = [
  CIRCLE_ACTIVE,
  CIRCLE_DEFAULT,
];

const pinMarkerTypes = [
  PIN_MARKER_GREEN,
  PIN_MARKER_BASE,
  PIN_MARKER_ORANGE,
  PIN_MARKER_YELLOW,
  PIN_MARKER_RED,
  PIN_MARKER_GRAY,
  PIN_MARKER_BLUE,
];


// To enable maptiler pass key in credentials
let maptilerCredentials;

class MapPreview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mapLocked: false,
      mapLockedMobile: true,
      mapNoAttr: false,
      mapAnimate: true,
      mapBoundsIndex: 0,

      polygonType: POLYGON_ACTIVE,
      polygonInteractive: true,

      pinMarkerType: PIN_MARKER_GREEN,
      markerContent: 'Wuba Duba Lub Lub',

      circleType: CIRCLE_ACTIVE,
    };
  }

  changeState(key, value) {
    const update = { [key]: value };
    this.setState(update);
  }

  handleAction() {
    console.warn('Action!!!');
  }

  renderMap() {
    const {
      mapLocked,
      mapLockedMobile,
      mapNoAttr,
      mapAnimate,
      mapBoundsIndex,
    } = this.state;

    return (
      <div className="preview-section">
        <Map
          credentials={maptilerCredentials}
          bounds={content.polygons[mapBoundsIndex]}
          locked={mapLocked}
          lockedMobile={mapLockedMobile}
          noAttribution={mapNoAttr}
          animate={mapAnimate}
          onLoad={this.handleAction}
        />
        <div className="preview-map-controls">
          <Select options={[0, 1]} defaultValue={mapBoundsIndex} onUpdate={this.changeState.bind(this, 'mapBoundsIndex')} label="View" />
        </div>
        <div className="preview-map-controls">
          <Checkbox defaultChecked={mapLocked} onUpdate={this.changeState.bind(this, 'mapLocked')} label="Locked" />
          <Checkbox defaultChecked={mapLockedMobile} onUpdate={this.changeState.bind(this, 'mapLockedMobile')} label="Locked Mobile" />
          <Checkbox defaultChecked={mapNoAttr} onUpdate={this.changeState.bind(this, 'mapNoAttr')} label="No Attribution" />
          <Checkbox defaultChecked={mapAnimate} onUpdate={this.changeState.bind(this, 'mapAnimate')} label="Animate" />
        </div>
      </div>
    );
  }

  renderPolygon() {
    const {
      polygonType,
      polygonInteractive,
    } = this.state;

    return (
      <div className="preview-section">
        <Map credentials={maptilerCredentials} bounds={content.polygons[0]}>
          <Polygon
            area={content.polygons[0]}
            type={polygonType}
            onClick={polygonInteractive ? this.handleAction : null}
          />
        </Map>
        <div className="preview-map-controls">
          <Select options={polygonTypes} defaultValue={polygonType} onUpdate={this.changeState.bind(this, 'polygonType')} label="Type" />
        </div>
        <div className="preview-map-controls">
          <Checkbox defaultChecked={polygonInteractive} onUpdate={this.changeState.bind(this, 'polygonInteractive')} label="Interactive" />
        </div>
      </div>
    );
  }

  renderPinMarker() {
    const { pinMarkerType } = this.state;

    return (
      <div className="preview-section">
        <Map credentials={maptilerCredentials} bounds={content.polygons[0]}>
          <PinMarker
            position={content.markers[0]}
            type={pinMarkerType}
            onPopupOpen={this.handleAction}
            onPopupClose={this.handleAction}
          >
            <MarkerPopup
              defaultOpen
              content="Lorem lorem"
              options={{
                offset: [0, -40],
              }}
            />
          </PinMarker>
        </Map>
        <div className="preview-map-controls">
          <Select options={pinMarkerTypes} defaultValue={pinMarkerType} onUpdate={this.changeState.bind(this, 'pinMarkerType')} label="Type" />
        </div>
      </div>
    );
  }

  renderContentMarkers() {
    const { markerContent } = this.state;

    return (
      <div className="preview-section">
        <Map credentials={maptilerCredentials} bounds={content.polygons[0]}>
          <CirleMarker position={content.markers[0]} content={markerContent} />
          <EyecatherMarker position={content.markers[1]} content={markerContent} />
        </Map>
        <div className="preview-map-controls">
          <Input defaultValue={markerContent} onUpdate={this.changeState.bind(this, 'markerContent')} label="Content" />
        </div>
      </div>
    );
  }

  renderMisc() {
    return (
      <div className="preview-section">
        <Map credentials={maptilerCredentials} bounds={content.polygons[0]}>
          <ImageMarker
            position={content.markers[0]}
            image={content.profileImage}
            caption="Caption"
          />
          <InfoMarker position={content.markers[1]} />
          <InfoMarker position={content.markers[2]} small />
          <LabelMarker position={content.markers[3]} content="LoLoL" />
        </Map>
      </div>
    );
  }

  renderCircle() {
    const {
      circleType,
    } = this.state;

    return (
      <div className="preview-section">
        <Map credentials={maptilerCredentials} bounds={content.polygons[0]}>
          <Circle
            center={content.markers[0]}
            radius={2000}
            type={circleType}
          />
        </Map>
        <div className="preview-map-controls">
          <Select options={circleTypes} defaultValue={circleType} onUpdate={this.changeState.bind(this, 'circleType')} label="Type" />
        </div>
      </div>
    );
  }

  render() {
    return (
      <article className="preview-map">
        <Header>Map</Header>
        {this.renderMap()}
        {this.renderPolygon()}
        {this.renderCircle()}
        {this.renderPinMarker()}
        {this.renderContentMarkers()}
        {this.renderMisc()}
      </article>
    );
  }
}

export default MapPreview;
