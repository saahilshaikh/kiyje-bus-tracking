import React from "react";
import { geolocated } from "react-geolocated";
import firebase from './../../../firebase/firebase.utils';

class HomePage extends React.Component {
    constructor(){
        super();
        this.state={
            lat:'80',
            lon:'',
            alt:'',
            head:'',
            speed:'',
        }
    }
    timer() {
        var date=new Date();
        this.setState({
          lat:this.props.coords.latitude,
          lon:this.props.coords.longitude,
          alt:this.props.coords.altitude,
          head:this.props.coords.heading,
          speed:this.props.coords.speed,
        });
        firebase.firestore().collection("location").doc("GcnDSBuUoO0s1WIG0EjL").update({
            lat: this.state.lat,
            lon:this.state.lon,
            createdAt:date
        });
      }
      componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 10000);
      }
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <table>
                <tbody>
                    <tr>
                        <td>latitude</td>
                        <td>{this.props.coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{this.props.coords.longitude}</td>
                    </tr>
                    <tr>
                        <td>altitude</td>
                        <td>{this.props.coords.altitude}</td>
                    </tr>
                    <tr>
                        <td>heading</td>
                        <td>{this.props.coords.heading}</td>
                    </tr>
                    <tr>
                        <td>speed</td>
                        <td>{this.props.coords.speed}</td>
                    </tr>
                </tbody>
            </table>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(HomePage);