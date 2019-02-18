import React, { Component } from "react";
import {Map, InfoWindow, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
import "./App.css";
import Geox from './Geox';
import MarkerConfig from "./MarkerConfig";
import Export from './Export';
import Import from './Import';
import Image1 from './image1.png';
import Image2 from './image2.png'

export class Markeur {

    constructor(nom,lat,lng){

        this.nom=nom;  
        this.lat=lat;
        this.lng=lng;
        this.titre="";
        this.texte="";
        this.img="";
        this.important=0;
    }
}


const style = {
    width: '75%',
    height: '75%',
};


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.geox = new Geox();

        this.state = {
            nbmk: 1,
            isOpen: false,
            Poly: true,
            on: props.on,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: 0,
        };
        this.button = this.state.on ? "none" : "block";


    }


/** Fonction serveur import - export **/

update = () => {this.setState({nbmk:10})};

/** Fonction qui permet de d'actualiser la polyline du markeur */
    newDragend = (markeur,p2,event) =>{
        var newlat = event.latLng.lat();
        var newlng = event.latLng.lng();
        var id= markeur.id;

        this.geox.mk[id].lng=newlng;
        this.geox.mk[id].lat=newlat;
        this.setState({nmbk:this.geox.mk.length,showingInfoWindow:false});
    };

    affichage = (markeur,p2,event) => {
    this.setState({on:!this.state.on})
    };


    ElementDiv = (titre,text,img,number) => {
        if(this.geox.mk.length > 0){

        this.geox.mk[this.state.selectedPlace.id].titre = titre;
        this.geox.mk[this.state.selectedPlace.id].texte = text;

        this.geox.mk[this.state.selectedPlace.id].important = 1;
        this.geox.mk[this.state.selectedPlace.id].img = img
        this.setState({nmbk:this.geox.mk.length});
        }
    }



    change () {
        this.setState({Poly:!this.state.Poly})
    }

    /** permet de supprimer un markeur depuis le bouton **/
    delete () {
        this.geox.mk.pop();
        this.setState({nbmk:this.geox.mk.length})
        this.setState({nbmk: this.geox.mk.length, showingInfoWindow: false,selectedPlace: 0})
    }
/** permet de supprimer tous les markeurs depuis le bouton **/
    deleteAll () {

        this.geox.mk.splice(0, this.geox.mk.length);
        this.setState({nbmk: this.geox.mk.length, showingInfoWindow: false, selectedPlace: 0})
    }

/** permet d'ajouter un markeur sur la map en appuyant sur click gauche**/
    handleMapClick(p1,p2,event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        this.geox.mk.push(new Markeur("point "+ this.geox.mk.length,lat,lng));
        this.setState({nbmk:this.geox.mk.length});
        console.log(this.geox.mk);
    }
    onMarkerClick = (props, marker, event) =>{
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            Event: event,
            });
            /** faire condition avec texte != "" et les autres !!!<< */
        if((this.geox.mk[props.id].important === 1)&&(this.geox.mk[props.id].texte !== "")){
            this.setState({showingInfoWindow:true})
        } else {
            this.setState({showingInfoWindow:false})
        }
};
    FunctionTestAfficher = () => {
        if (this.geox.mk.length > 1){
            console.log(this.geox.mk[0].lat);
            return this.geox.mk[1].lat
        }
    };

    SupprimerMarkeurActuel = () => {

        console.log(this.geox.mk[this.state.selectedPlace.id]);
        this.geox.mk.splice(this.state.selectedPlace.id,1);
    
        this.setState({nbmk: this.geox.mk.length, showingInfoWindow: false, selectedPlace: 0})
    };



    render() {

        let icon=Image2
        let rows = [];
        let poli = [];
        let info="";

        for (var i = 0; i< this.geox.mk.length;i++){
            if (this.geox.mk[i].important === 0){
                icon = Image2;
            } else {
                icon = Image1;
            }
            rows.push(
                <Marker
                id={i} name={this.geox.mk[i].nom}
                onClick={this.onMarkerClick}
                draggable={true} onDragend={this.newDragend}
                position={{lat: this.geox.mk[i].lat,lng: this.geox.mk[i].lng}}
                icon= {icon}
                />);

            poli.push(rows[i].props.position)
      }
      if((this.geox.mk.length > 0)&&(this.state.selectedPlace !== 0)){
          
          info= <div className="MarkeurInfo">
          <h2>{this.geox.mk[this.state.selectedPlace.id].titre}</h2>
          <p>{this.geox.mk[this.state.selectedPlace.id].texte}</p>
          <img className="imgdiv" src={this.geox.mk[this.state.selectedPlace.id].img} alt=""/>
      </div>
      }
       
        const polySelector = this.state.Poly ? poli : null;




        return (
            <div className="MAPP">
            <div className="mapSize">
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
                    path={polySelector}
                    strokeWeight={2}
                    />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        >
                        {info}
                    </InfoWindow>

                </Map>
                </div>
                <div className="sectiondroit">
                    <ul className="ulmap">
                        <li><button onClick={this.deleteAll.bind(this)}>Supprimer tous les markeurs</button></li>
                        <br/>
                        <li><button onClick={this.delete.bind(this)}>Supprimer dernier markeur</button></li>
                        <br/>
                        <li><button onClick={this.change.bind(this)}>Tracer:{this.state.Poly ? " Désactiver": " Activer"}</button></li>
                    </ul>
                    <div>
                    <MarkerConfig
                        laat={this.state.selectedPlace.id}
                        delete={this.SupprimerMarkeurActuel}
                        add={this.ElementDiv}
                        Markeur={this.geox.mk[this.state.selectedPlace.id]}
                    />
                    </div>
                </div>
                <div className="sectionbas">
                    <Export jsonSave={this.geox.mk}/>
                    <Import jsonLoad={this.geox.mk} callback={this.update}/>
                </div>


            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84"

})(MapContainer)