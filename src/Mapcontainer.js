import React, { Component } from "react";
import {Map, InfoWindow, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
import "./App.css";
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
        this.icon=Image2;
        this.important= 0;


    }
}


const style = {
    width: '75%',
    height: '75%',

};


export class MapContainer extends Component {





    constructor(props) {
        super(props);
        this.mk = [];

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

/** Function qui permet de d'actualiser la polyline du markeur pour */
    newDragend = (markeur,p2,event) =>{

        var newlat = event.latLng.lat();
        var newlng = event.latLng.lng();
        var id= markeur.id;
        console.log(newlng);
        console.log(id);
        console.log(this.mk[id]);
        this.mk[id].lng=newlng;
        this.mk[id].lat=newlat;
        this.setState({nmbk:this.mk.length,showingInfoWindow:false});
        
    };

    affichage =(markeur,p2,event) => {
    this.setState({on:!this.state.on})

    };

    test = (titre,text,img,number) => {
        console.log(this.mk);
        this.mk[this.state.selectedPlace.id].titre = titre;
        this.mk[this.state.selectedPlace.id].text = text;

        console.log(titre);
        console.log(text);
        console.log(img);
        console.log(number);
        this.mk[this.state.selectedPlace.id].icon = Image1
        this.mk[this.state.selectedPlace.id].important = 1;
        this.setState({nmbk:this.mk.length});
        
        
    
    }



    change () {
        this.setState({Poly:!this.state.Poly})
    }

    /** permet de supprimer un markeur depuis le bouton **/
    delete () {
        this.mk.pop();
        this.setState({nbmk:this.mk.length})
        this.setState({nbmk: this.mk.length, showingInfoWindow: false})
    }
/** permet de supprimer tous les markeurs depuis le bouton **/
    deleteAll () {

        this.mk.splice(0, this.mk.length);
        this.setState({nbmk: this.mk.length, showingInfoWindow: false})
    }



/** permet d'ajouter un markeur sur la map en appuyant sur click gauche**/
    handleMapClick(p1,p2,event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        this.mk.push(new Markeur("point "+ this.mk.length,lat,lng));
        this.setState({nbmk:this.mk.length});
        console.log(this.mk);


    }
    onMarkerClick = (props, marker, event) =>{
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            Event: event,
            });
        if(this.mk[props.id].important === 1){
            this.setState({showingInfoWindow:true})
        }else {
            this.setState({showingInfoWindow:false})
        }
               
        console.log(this.state.Event)
};
    FunctionTestAfficher = () => {
        if (this.mk.length > 1){
            console.log(this.mk[0].lat);
            return this.mk[1].lat

        }
    };

    SupprimerMarkeurActuel  =() => {

        console.log(this.mk[this.state.selectedPlace.id]);
        this.mk.splice(this.state.selectedPlace.id,1);
        this.setState({nbmk:this.mk.length})
        this.setState({nbmk: this.mk.length, showingInfoWindow: false})

    };



    render() {

        this.icon = Image1
        let  rows = [];
        let  poli = [];
        let  info="";

        for (var i = 0; i< this.mk.length;i++){
            rows.push(
                <Marker
                id={i} name={this.mk[i].nom}
                onClick={this.onMarkerClick}
                draggable={true} onDragend={this.newDragend}
                position={{lat: this.mk[i].lat,lng: this.mk[i].lng}}
                icon= {this.mk[i].icon}
                />);
    


            poli.push(rows[i].props.position)
      }
console.log(this)
      if((this.mk.length > 0)&&(this.state.selectedPlace != 0)){
          
          info= <div className="MarkeurInfo">
          <h2>{this.mk[this.state.selectedPlace.id].titre}</h2>
          <p>{this.mk[this.state.selectedPlace.id].text}</p>
          <img className="imgdiv" src="https://www.optoma.fr/images/ProductApplicationFeatures/4kuhd/banner.jpg"/>
      </div>
      }
       
        const polySelector = this.state.Poly ? poli : null;




        return (
            <div className="MAPP">
console.log("ici "+ img)
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
                    />

                    <InfoWindow
                        onOpen={this.windowHasOpened}
                        onClose={this.windowHasClosed}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        {info}
                        
                    </InfoWindow>

                </Map>

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
                        add={this.test}
                        Markeur={this.mk[this.state.selectedPlace.id]}

                    />
                    </div>
                </div>
                <div className="sectionbas">
                    <Export jsonSave={this.mk}/>
                    <Import jsonLoad={this.mk} callback={this.update}/>

                </div>


            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84"

})(MapContainer)