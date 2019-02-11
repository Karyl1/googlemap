import React, { Component } from "react";

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MyMarker {
    nom="";

    constructor(nom,lat,lng) {
        this.nom=nom;
        this.lat=lat;
        this.lng=lng;
    }

    distance(mk) {
        // renvoie la distance en mètres entre les deux marqueurs

    }



}

export class GMaps extends Component {

    constructor(props) {
        super(props);

        this.mk=[];

        this.mk.push(new MyMarker("Capitole",43.604409,1.443416));

        this.state={nbmk:1};

        this.mapClicked=this.mapClicked.bind(this);
    }
    mapClicked(p1, p2, clickEvent) {
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.mk.push(new MyMarker("Nouveau",lat,lng));
        this.setState({nbmk:this.mk.length});
    }

    moveMarker(marker,map,clickEvent) {
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log(lat,lng);
        console.log(clickEvent);
    }

    render() {
        let rows = [];
        for (let i = 0; i < this.mk.length; i++)
            rows.push(<Marker id={i} title={this.mk[i].nom} position={{lat:this.mk[i].lat,lng:this.mk[i].lng}}  />);

        return (
            <Map
                google={this.props.google}
                initialCenter={{
                    lat: 43.5999,
                    lng: 1.443239
                }}
                fullscreenControl={false}
                streetViewControl={false}
                zoom={16}
                onClick={this.mapClicked}
            >
                {rows}

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey : "AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84"
})(GMaps)