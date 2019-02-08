import React, { Component } from "react";
import {Map, InfoWindow, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
import "./App.css";
import MarkerConfigxxx from "./MarkerConfig";


class polyline {
    constructor(lat,lng){
        this.lat=lat;
        this.lng=lng;
    }
}


class Markeur {

    constructor(nom,lat,lng){

        this.nom=nom;
        this.lat=lat;
        this.lng=lng;


    }
}

const style = {
    width: '75%',
    height: '75%',

};


export class MapContainer extends Component {





    constructor(props) {
        super(props);
        this.mk=[];

        this.state={
            nbmk:1,
            isOpen:false,
            Poly:true,
            id:0,
            on: props.on,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            Event: {},


        };
        this.button = this.state.on ? "none" : "block";
        this.mkpoly=[];


//this.testt=this.testt.bind(this);

    }

    OnClickMarker = (markeur,p2,event) =>{

        var newlat = event.latLng.lat();
        var newlng = event.latLng.lng();
        var id= markeur.id;
        this.setState({activeMarker:p2, showingInfoWindow:true});

        console.log(newlng);
        console.log(id);
        console.log(this.mk[id]);
        this.mk[id].lng=newlng;
        this.mk[id].lat=newlat;



        this.setState({nmbk:this.mk.length});
    };

    affichage =(markeur,p2,event) => {
    this.setState({on:!this.state.on})

    };



    change () {
        this.setState({Poly:!this.state.Poly})
    }

    delete () {
        this.mk.pop();
        this.setState({nbmk:this.mk.length})
        this.setState({nbmk: this.mk.length, showingInfoWindow: false})
    }

    deleteall () {

        this.mk.splice(0, this.mk.length);
        this.setState({nbmk: this.mk.length, showingInfoWindow: false})
    }




    handleMapClick(p1,p2,event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        this.mk.push(new Markeur("point "+ this.mk.length,lat,lng));
        this.mkpoly.push(new polyline(lat,lng));
        this.setState({nbmk:this.mk.length});



        console.log(this.mk);


    }
    onMarkerClick = (props, marker, event) =>{


        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            Event: event,
            showingInfoWindow:true,

        });
        console.log(this.state.Event)
};
    testtt = () => {
        if (this.mk.length > 1){
            console.log(this.mk[0].lat);
            return this.mk[1].lat

        }
    };

    deleteeee =(markeur,p2,event) => {

        console.log(p2);
    };

refs  = () => {
    this.setState({nbmk:this.mk.length})

}


    render() {


        let  rows = [];
      let  poli = [];

      for (var i = 0; i< this.mk.length;i++){

          rows.push(<Marker
                            id={i} name={this.mk[i].nom} onClick={this.OnClickMarker} draggable={true} onDragend={this.testt} position={{lat: this.mk[i].lat,lng: this.mk[i].lng}}/>)
          poli.push(rows[i].props.position)
      }

        const test = this.state.Poly ? poli : null;




        return (
            <div className="MAPP">

                <Map
                    style={style}
                    google={this.props.google}
                    zoom={18}
                    initialCenter={{lat:43.599980, lng:1.443138}}
                    streetViewControl={false}
                    mapTypeControl={false}
                    onClick={this.handleMapClick.bind(this)}

                    disableDoubleClickZoom={true}
                >
                    {rows}
                    <Polyline
                    path={test}
                    />

                    <InfoWindow
                        onOpen={this.windowHasOpened}
                        onClose={this.windowHasClosed}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <p>le markeur {this.state.selectedPlace.id}</p>
                            <p>me servira d'appéritif</p>
                            <img src="https://www.girlizz.com/img_jeux/1912.jpg"/>
                        </div>
                    </InfoWindow>

                </Map>

                <div className="cuicui">
                    <button onClick={this.deleteall.bind(this)}>Supprimer tous les markeurs</button>
                    <button onClick={this.delete.bind(this)}>Supprimer dernier markeur</button>
                    <button onClick={this.change.bind(this)}>Tracer:{this.state.Poly ? " Désactiver": " Activer"}</button>
                    <MarkerConfigxxx laat={this.state.selectedPlace.id} delete={this.deleteeee}  />



                </div>
                <div className="cuii">


                </div>


            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84"

})(MapContainer)