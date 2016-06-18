import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { grey100, grey600, red500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

import { storeSource, storeDestination, getShortestPath, storeSourceLabel, storeDestinationLabel } from './../actions/mapActions';

let styles = {
  formTab: {
    paddingBottom: '16px'
  },
  formGroup: {
    margin: '16px',
    padding: '16px'
  },
  formItem: {
    margin: '16px'
  },
  formLabel: {
    text: 'bold',
    fontSize: '17px',
    color: grey600
  },
  formLabel2: {
    text: 'bold',
    fontSize: '20px',
    color: grey600
  },
  errorLabel: {
    text: 'bold',
    fontSize: '17px',
    color: red500
  }
};

let buttonStyle = {
  margin : 12
};

let mymap;

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.storeSource = this.storeSource.bind(this);
    this.storeDestination = this.storeDestination.bind(this);
    this.helperShortestPath = this.helperShortestPath.bind(this);
    this.drawShortestPath = this.drawShortestPath.bind(this);
    this.fillExample1 = this.fillExample1.bind(this);
    this.fillExample2 = this.fillExample2.bind(this);
  }

  componentDidMount() {
    this.leafletIntialization();
  }

  leafletIntialization() {
    mymap = L.map('mapid').setView([40.7506, -74.0078], 13);

    L.tileLayer('https://api.mapbox.com/v4/lakshmanld.0cuhaqmh/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGFrc2htYW5sZCIsImEiOiJjaW9mcXY0MDAwMTU4dWxtM3htaXJ5YzVyIn0.2Oa2xgiBO9c2FeD1hN9Vjg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'lakshmanld.06924a64',
    accessToken: 'pk.eyJ1IjoibGFrc2htYW5sZCIsImEiOiJjaW9mcXY0MDAwMTU4dWxtM3htaXJ5YzVyIn0.2Oa2xgiBO9c2FeD1hN9Vjg'
    }).addTo(mymap);
  }

  storeSource(e) {
    if (e.target.value !== 'h') {
      this.props.dispatch(storeSourceLabel('Error!!'));
    }
    this.props.dispatch(storeSource(e.target.value));
  }

  storeDestination(e) {
    if (e.target.value !== 'h') {
      this.props.dispatch(storeDestinationLabel('Error!!'));
    }
    this.props.dispatch(storeDestination(e.target.value));
  }

  helperShortestPath() {
    this.props.dispatch(getShortestPath(this.props.source, this.props.destination));
    setTimeout(this.drawShortestPath, 4000);
  }

  drawShortestPath() {

    let latlong = [];

    for (let i = 0; i < this.props.latlngs.length; i++) {
      let obj = new L.LatLng(this.props.latlngs[i].lat, this.props.latlngs[i].long);
      latlong.push(obj);
    }

    let firstpolyline = new L.polyline(latlong, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1

    });

    firstpolyline.addTo(mymap);
  }

  getUrl() {
    return '/source=' + this.props.source + '/destination=' + this.props.destination;
  }

  customized1Url() {
    return '/source=4011390051/destination=3955372902';
  }

  customized2Url() {
    return '/source=30978752/destination=42421969';
  }

  fillExample1() {
    this.props.dispatch(getShortestPath('4011390051', '3955372902'));
    setTimeout(this.drawShortestPath, 4000);
    this.props.dispatch(storeSource('4011390051'));
    this.props.dispatch(storeDestination('3955372902'));
  }

  fillExample2() {
    this.props.dispatch(getShortestPath('30978752', '42421969'));
    setTimeout(this.drawShortestPath, 4000);
    this.props.dispatch(storeSource('30978752'));
    this.props.dispatch(storeDestination('42421969'));
  }

  render() {

    return (
      <div className='row'>
        <div className='col-xs-12 col-sm-3'>
          <center>
            <label style={styles.formLabel2}> Commute New York by finding the shortest path </label>
            <br />
            <br />
            <label style={styles.formLabel}> Source </label>
            <TextField id='Source' hintText='Source' onChange={this.storeSource} value={this.props.source} />
            <br />
            <p style={styles.errorLabel} > {this.props.sourceLabel} </p>
            <br />
            <label style={styles.formLabel}> Destination </label>
            <TextField id='Destination' hintText='Destination' onChange={this.storeDestination} value={this.props.destination} />
            <br />
            <p style={styles.errorLabel} > {this.props.destinationLabel} </p>
            <br />
            <Link to={this.getUrl()} >
              <RaisedButton label="Go" primary={true} style={buttonStyle} onTouchTap={this.helperShortestPath} />
            </Link>
            <br />
            <br />
            <br />
            <label style={styles.formLabel2}> Try these examples </label>
            <Link to={this.customized1Url()} >
              <h3 onTouchTap={this.fillExample1}> Drive from lacoste to laguna </h3>
            </Link>
            <Link to={this.customized2Url()} >
              <h3 onTouchTap={this.fillExample2}> Drive along the mines </h3>
            </Link>
            <br />
            <label style={styles.formLabel2}> After clicking the examples, It takes some time to find the shortest path </label>
          </center>
        </div>
        <div id='mapid' className='col-xs-12 col-sm-9'>
        </div>
      </div>
    );
  }
}

MapComponent.propTypes = {
  source: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  latlngs: PropTypes.array.isRequired,
  sourceLabel: PropTypes.string.isRequired,
  destinationLabel: PropTypes.string.isRequired
};

export default connect(state => ({
  source: state.source,
  destination: state.destination,
  latlngs: state.latlngs,
  sourceLabel: state.sourceLabel,
  destinationLabel: state.destinationLabel
}))(MapComponent);
