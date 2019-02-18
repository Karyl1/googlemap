import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';

import Poly from './polyline';
import MyMarker from './marker';


export class GMaps extends Component {

    constructor(props) {
        super(props);
        this.mkpoly = [];
        this.tab = [];
        this.lines= [];
        this.rows= []
        this.state = {
       
            isOpen: false,
        };
    }

    delete = () => {
        this.tab.pop();
        this.setState({ nbmk: this.tab.length })
    }

    mapClicked = (p1, p2, clickEvent) => {


        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.tab.push(new MyMarker("Nouveau", lat, lng));
        // this.mkpoly.push(new Poly(lat, lng))

        this.rows = this.tab.map((el, index) => {
            return <Marker draggable={true} onDragend={this.moveMarker} title={el.nom} key={index} id={index} position={{ lat: el.lat, lng: el.lng }} />
        })
        
        this.lines = this.rows.map((el) => {
           return el.props.position
        })
console.log("arno"+this.lines);

        this.mkpoly.push(<Polyline path={this.lines} geodesic={true} options={{ strokeColor: '#808', strokeOpacity: 0.75, strokeWeight: 3 }} />)
   
        this.setState({
            isOpen: true
        })

 
    }

    moveMarker = (marker, map, clickEvent) => {
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.tab[marker.id].lat = lat;
        this.tab[marker.id].lng = lng;
   
        this.setState({
             isOpen: true
        })

        console.log(lat,lng);
    }

    render() {
      
    
 

        return (
            <Map
                google={this.props.google}
                initialCenter={{
                    lat: 43.5999,
                    lng: 1.443239
                }}

                mapTypeControl={true}
                zoom={16}
                onClick={this.mapClicked}
                onRightclick={this.delete}
            >
            {/* <Polyline
                path={this.state.lines}
                geodesic={true}
                options={{
                    strokeColor: '#808',
                    strokeOpacity: 0.75,
                    strokeWeight: 3,
                }}
            /> */}
                {this.rows}
                {this.mkpoly}

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84"
})(GMaps)