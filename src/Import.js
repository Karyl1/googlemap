import React, { Component } from 'react';
import { Markeur } from './Mapcontainer';
import Swal from 'sweetalert2';

class Import extends Component {
    importJson = () => {
        Swal.fire({title: "Quel est son nom ?",
        input: "text",
        preConfirm: (search) => {
            if(search !== null){
                fetch('http://192.168.16.102:8080/load?name=' + search.toLowerCase() + '.txt')
                .then(str => str.json())
                .then(res => {
                    this.props.jsonLoad.splice(0,this.props.jsonLoad.length);
                    for(var i=0;i<res.length;i++){
                        let tmp=new Markeur(res[i].nom, res[i].lat, res[i].lng);
                        tmp.titre=res[i].titre;
                        tmp.texte=res[i].texte;
                        tmp.img=res[i].img;
                        tmp.important=res[i].important;
                        tmp.icon=res[i].icon;
                        console.log(tmp)
                        this.props.jsonLoad.push(tmp);
                    } // Récupère le fichier demandé par l'utilisateur
                    this.props.callback();
                })}}})};
        // let file = prompt("What's her name ?"); //Load le fichier demandé par l'utilisateur
        // if(file !== null){
        // fetch('http://192.168.16.102:8080/load?name=' + file.toLowerCase() + '.txt')
        // .then(str => str.json())
        // .then(res => {
        //     this.props.jsonLoad.splice(0,this.props.jsonLoad.length);
        //     for(var i=0;i<res.length;i++){
        //         let tmp=new Markeur(res[i].nom, res[i].lat, res[i].lng);
        //         tmp.titre=res[i].titre;
        //         tmp.texte=res[i].texte;
        //         tmp.img=res[i].img;
        //         tmp.important=res[i].important;
        //         tmp.icon=res[i].icon;
        //         console.log(tmp)
        //         this.props.jsonLoad.push(tmp);
        //     } // Récupère le fichier demandé par l'utilisateur
        //     this.props.callback();
        // })
        // .catch(error=>{Swal.fire(
        //     'Oh non !...',
        //     'Le fichier à mal été enregistré',
        //     'error'
        //   )})}
    // };
    render(){
        return(
            <div><button onClick={this.importJson} className="import">Importer</button></div>
        );
    }
}

export default Import;
