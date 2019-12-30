import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect } from 'react-redux-firebase';
const AnyReactComponent = () => <div style={{transform:'scale(3)',color:'red'}}><i className="fas fa-map-pin"></i></div>;
 
class SimpleMap extends Component {
    state={
        lat:'',
        long:''
    }
 
  render() {
      const {location}=this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        {
            location && location.map(loc=>{
                var longitude=loc.lon;
                var latitude=loc.lat;
                return(
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCw1Cu5QmZqsFLWq-D7m12E3Qqjjj13xWY" }}
                    defaultZoom={17}
                    defaultCenter={{ lat: latitude,
                        lng:  longitude}}
                    >
                    <AnyReactComponent
                        lat={latitude}
                        lng={longitude}
                    />
                    </GoogleMapReact>
                )
            })
        }
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
    return{
        location:state.firestore.ordered.location,
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'location'},
    ])
)(SimpleMap);


// import _ from "lodash";
// import React from "react";
// import { compose, withProps } from "recompose";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyCw1Cu5QmZqsFLWq-D7m12E3Qqjjj13xWY&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `100vh` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: 22, lng: 88 }}>
//     <Marker position={{ lat: 22.553488, lng: 88.358292 }} />
//   </GoogleMap>
// ));

// const enhance = _.identity;

// const ReactGoogleMaps = () => [
//   <MyMapComponent key="map" />
// ];

// export default enhance(ReactGoogleMaps);