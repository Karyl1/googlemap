import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';

import Poly from './polyline';
import MyMarker from './marker';

export class GMaps extends Component {

    constructor(props) {
        super(props);
        this.mk=[];
        this.mkpoly=[];

        this.state={nbmk:1, isOpen: false};
        this.mapClicked=this.mapClicked.bind(this);
    }


    delete = ()  =>{
        this.mk.pop();
        this.setState({nbmk:this.mk.length})
    }

    mapClicked(p1, p2, clickEvent) {
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.mk.push(new MyMarker("Nouveau",lat,lng));
        this.mkpoly.push(new Poly(lat,lng));
        this.setState({nbmk:this.mk.length});

    }

    moveMarker(marker,map,clickEvent) {
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();

    }

    render() {
        let rows = [];
        let coord = []
        for (let i = 0; i < this.mk.length; i++){
            rows.push(<Marker draggable={true} id={i} title={this.mk[i].nom} position={{lat:this.mk[i].lat,lng:this.mk[i].lng} }  />);
            coord.push(rows[i].props.position)}
            console.log(coord)
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
                {rows}
                <Polyline
                path={coord}
                geodesic={true}
                options={{
                    strokeColor: "#808",
                    strokeOpacity: 0.75,
                    strokeWeight: 3,
        
                }}
                />
              
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey : "AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84"
})(GMaps)