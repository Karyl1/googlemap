import React, { Component } from 'react';
import { Markeur } from './Mapcontainer';

class Import extends Component {
    importJson = () => {
        let file = prompt("What's her name ?"); //Load le fichier demandé par l'utilisateur
        fetch('http://192.168.16.24:8080/load?name=' + file.toLowerCase() + '.txt')
        .then(str => str.json())
        .then(res => {
            this.props.jsonLoad.splice(0,this.props.jsonLoad.length);
            for(var i=0;i<res.length;i++){
                this.props.jsonLoad.push(new Markeur(res[i].nom, res[i].lat, res[i].lng));
            } // Récupère le fichier demandé par l'utilisateur
            console.log("ici1"+this.props.jsonLoad);
            this.props.callback();
        })
    };
    render(){
        return(
            <div><button onClick={this.importJson} className="import">Import</button></div>
        );
    }
}

export default Import;