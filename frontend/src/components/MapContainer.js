import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component } from 'react';
import Footer from './Footer';
import  Navigation from './Navigation'
export class MapContainer extends Component {
  render() {
    return (
      <>
    
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
             
        </InfoWindow>
      </Map>
     
      </>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyB5s08CXU32p1aez-uJEWdsmO_6JHaNqKg')
})(MapContainer)