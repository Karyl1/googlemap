import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import React, {Component} from 'react';
import Marqueur from './Marker';
import Export from './Export';
import Import from './Import';
// import Liste from './Liste';



export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.mark=[];
        // this.geox=new Geox();
        this.state={nbmark:0};

        this.mapClicked=this.mapClicked.bind(this);
        this.removeMark=this.removeMark.bind(this);
    }
    mapClicked(param1, param2, clickEvent) {
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.mark.push(new Marqueur("Marqueur-"+this.mark.length,lat,lng));
        console.log(this.mark);
        this.setState({nbmark:this.mark.length});
    }
    moveMarker(marker, map, clickEvent){
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();
    }
    removeMark(){
        this.mark.pop();
        this.setState({nbmark:this.mark.length});
    }
    update = () => {this.setState({nbmark:10})};
    render(){
        let marko = [];
        for (let i=0;i<this.mark.length;i++){
            marko.push(<Marker id={i} draggable={true} title={this.mark[i].nom} position={{lat:this.mark[i].lat, lng:this.mark[i].lng}} />);
        }
        return(
            <div>
            <Map
            google={this.props.google}
            initialCenter={{lat: 43.599933,lng: 1.443198}} 
            zoom={18} 
            onClick={this.mapClicked} 
            disableDoubleClickZoom
            onRightclick={this.removeMark}
            >

            {marko}
            </Map>
            <Export jsonSave={this.mark}/>
            <Import jsonLoad={this.mark} callback={this.update}/> 
            {/* <Liste />  */}
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84")
  })(MapContainer)