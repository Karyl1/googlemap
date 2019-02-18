import React, { Component } from 'react';
import { Markeur } from './Mapcontainer';

class Import extends Component {
    importJson = () => {
        let file = prompt("What's her name ?"); //Load le fichier demandé par l'utilisateur
        if(file !== null){
        fetch('http://192.168.16.102:8080/load?name=' + file.toLowerCase() + '.txt')
        .then(str => str.json())
        .then(res => {
            this.props.jsonLoad.splice(0,this.props.jsonLoad.length);
            console.log(res);
            for(var i=0;i<res.length;i++){
                let tmp=new Markeur(res[i].nom, res[i].lat, res[i].lng);
                tmp.titre=res[i].titre;
                tmp.texte=res[i].texte;
                tmp.img=res[i].img;
                tmp.important=res[i].important;
                console.log(tmp)
                this.props.jsonLoad.push(tmp);
            } // Récupère le fichier demandé par l'utilisateur
            this.props.callback();
        })}
    };
    render(){
        return(
            <div><button onClick={this.importJson} className="import">Import</button></div>
        );
    }
}

export default Import;
