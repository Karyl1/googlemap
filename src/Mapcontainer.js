import React, { Component } from "react";
import {Map, InfoWindow, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
import "./App.css";
import Geox from './Geox';
import MarkerConfig from "./MarkerConfig";
import Export from './Export';
import Import from './Import';
import Image1 from './image1.png';
import Image2 from './image2.png'
import Image3 from './Image3.png'
import Image4 from './Icone4.png'
import Itineraire from './itinéraire';

export class Markeur {

    constructor(nom,lat,lng){

        this.nom=nom;  
        this.lat=lat;
        this.lng=lng;
        this.titre="";
        this.texte="";
        this.img="";
        this.icon=Image2;
        this.important=0;
    }
}


const style = {
    // width: '75%',
    // height: '85%',
    // position: 'relative',
    border: '1px solid orange'
};


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.geox = new Geox();

        this.state = {
            origin: null,
            destination: null,
            points: [],
            nbmk: 1,
            isOpen: false,
            Poly: false,
            on: props.on,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: 0,
            Vtt:false
        };
        this.button = this.state.on ? "none" : "block";
        


    }


/** Fonction serveur import - export **/

update = () => {
    
    
    this.setState({nbmk:10})};


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
        if((titre !== "")||(text !== "")||(img!=="")){
        if((this.geox.mk.length > 0)&&(this.state.selectedPlace !== 0)){

        this.geox.mk[this.state.selectedPlace.id].titre = titre;
        this.geox.mk[this.state.selectedPlace.id].texte = text;
        this.geox.mk[this.state.selectedPlace.id].icon = Image1;
        this.geox.mk[this.state.selectedPlace.id].important = 1;
        this.geox.mk[this.state.selectedPlace.id].img = img;
        this.setState({nmbk:this.geox.mk.length});
        }
    }
    }

  


    change () {
      
        if(this.state.Poly === false){
            this.setState({Poly:true})
        }else{
            this.setState({Poly:false})
        } 
    }

    Modevtt = () => {
        if(this.state.Poly === false){
            this.setState({Poly:true})
        }
        if(this.state.Vtt === false){

            for(var i=0;i<this.geox.mk.length;i++){
                if (!((i=== 0)||(i=== this.geox.mk.length - 1)||(this.geox.mk[i].important === 1))){
                        this.geox.mk[i].icon = Image4
                }
            }
            this.setState({Vtt: true});
            console.log(this.state.Modevtt)
        }
        if(this.state.Vtt === true){
            for(let i=0;i<this.geox.mk.length;i++){       
                if(this.geox.mk[i].important === 1){
                    this.geox.mk[i].icon = Image1            /** << Permet quand on appuis sur un markeur de donner l'image de base  */
                }else{
                    this.geox.mk[i].icon = Image2}       
            
        } this.setState({Vtt: false});
        
        }

    }

    

    /** permet de supprimer un markeur depuis le bouton **/
    delete () {
        this.geox.mk.pop();
        
        this.setState({
            nbmk: this.geox.mk.length, 
            showingInfoWindow: false,
            selectedPlace: 0,
            origin:null,
            destination:null})
    }
/** permet de supprimer tous les markeurs depuis le bouton **/
    deleteAll () {

        this.geox.mk.splice(0, this.geox.mk.length);
        this.setState({nbmk: this.geox.mk.length, 
            showingInfoWindow: false, 
            selectedPlace: 0,
            origin:null,
            destination:null,
        })
    }

/** permet d'ajouter un markeur sur la map en appuyant sur click gauche**/
    handleMapClick(p1,p2,event) {
        this.setState({Vtt: false})
        

        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        this.geox.mk.push(new Markeur("point "+ this.geox.mk.length,lat,lng));
        this.setState({nbmk:this.geox.mk.length});
        console.log(this.geox.mk);
    }
    onMarkerClick = (props, marker, event) =>{
        for(let i=0;i<this.geox.mk.length;i++){       
            if(this.geox.mk[i].important === 1){
                this.geox.mk[i].icon = Image1    }        /** << Permet quand on appuis sur un markeur de donner l'image de base  */
            if((this.geox.mk[i].icon !== Image4)&&(this.geox.mk[i].important !== 1)){
                this.geox.mk[i].icon = Image2
            }
            
        }
        console.log(props)
        this.setState({nmbk:this.geox.mk.length});
        if( this.geox.mk[props.id].important === 0){
            this.geox.mk[props.id].icon = Image3
        }

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            Event: event,
           
            });
        if (this.state.origin === null){
            this.setState({
                origin: props
            })
        }else{
            this.setState({
                destination: props
            })
        }
        let un = this.state.origin
        let unn = this.state.destination
        
        if((this.state.destination !== null)&&(this.state.origin !== null)&&(this.state.destination.id < this.state.origin.id)){
            
            console.log('la fonction marche')
            this.setState({origin:unn,destination:un})
        }
       /* console.log('un après function')
        console.log(un)
        console.log('deux')
        console.log(unn)/ 
    
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
    
        this.setState({nbmk: this.geox.mk.length,
             showingInfoWindow: false, 
             selectedPlace: 0,
             origin:null,
             destination:null

            })
    };

    tracerItineraire = (points) => {
        
        let result = []
        let deux = []
        let test = []
        let un = []
        let cy = []
        
       
        un = this.geox.mk.slice(0,this.state.origin.id + 1)
        deux = this.geox.mk.slice(this.state.destination.id,this.geox.mk.length)
        cy = points.map((el, index) => {
            const lat = el[0]
            const lng = el[1]
    
            test.push(new Markeur("generate "+ this.geox.mk.length,lat,lng,))
    
            return test
    
        })

             console.log(un)
             console.log(deux)
             console.log(cy)
             result = result.concat(un)
             result = result.concat(test)
             result = result.concat(deux)

        

        
        

        this.geox.mk = result
        console.log(this.geox.mk)
        this.setState({origin: null,destination: null,})
        // this.geox.mk.slice(1,2) 
    }

    render() {

      
        let rows = [];
        let poli = [];
        let info="";

        for (var i = 0; i< this.geox.mk.length;i++){
            // if (this.geox.mk[i].important === 0){
            //     this.iicon = Image2;
            // } else {
            //     this.iicon = Image1;
            // }
            rows.push(
                <Marker
                id={i} name={this.geox.mk[i].nom}
                onClick={this.onMarkerClick}
                draggable={true} onDragend={this.newDragend}
                position={{lat: this.geox.mk[i].lat,lng: this.geox.mk[i].lng}}
                icon= {this.geox.mk[i].icon}
                />);
            
            poli.push(rows[i].props.position)
      }
     

      if((this.geox.mk.length > 0)&&(this.state.selectedPlace !== 0)){
          info= <div className="markeurInfo">
          <h2>{this.geox.mk[this.state.selectedPlace.id].titre}</h2>
          <p>{this.geox.mk[this.state.selectedPlace.id].texte}</p>
          <img className="imgdiv" src={this.geox.mk[this.state.selectedPlace.id].img} alt=""/>
      </div>
      }
       
        const polySelector = this.state.Poly ? poli : null;




        return (
            <div className="MAPP">
                <div className="mapSize">
                <Itineraire 
                    tracerItin ={this.tracerItineraire}
                    origin={this.state.origin}
                    destination= {this.state.destination}
                />
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
                    <ul className="ulDroit" id="scroll_down">
                        <li><button className="ulButton delAllButton" onClick={this.deleteAll.bind(this)}>Supprimer tous les marqueurs</button></li>

                        <li><button className="ulButton delButton" onClick={this.delete.bind(this)}>Supprimer le dernier marqueur</button></li>

                        <li><button className="ulButton tracerButton" onClick={this.change.bind(this)}>{this.state.Poly ? " Désactiver": " Activer"} le tracé</button></li>
                    
                        <li><button  className="ulButton vttButton" onClick={this.Modevtt}>{this.state.Vtt ? " Désactivé": " Activé"} Mode VTT </button></li>
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
                    <div className="sectionRelative">
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